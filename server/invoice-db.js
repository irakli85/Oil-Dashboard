import { neon } from '@neondatabase/serverless'
import tls from 'node:tls'

let sql
let initPromise

function getPool() {
  if (!sql) {
    const connectionString =
      process.env.POSTGRES_URL ||
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.DATABASE_URL

    if (!connectionString) {
      const error = new Error('database_not_configured')
      error.code = 'DATABASE_NOT_CONFIGURED'
      throw error
    }

    if (process.platform === 'win32' && tls.getCACertificates && tls.setDefaultCACertificates) {
      const systemCertificates = tls.getCACertificates('system')
      if (systemCertificates.length > 0) {
        tls.setDefaultCACertificates([...tls.getCACertificates(), ...systemCertificates])
      }
    }

    sql = neon(connectionString)
  }
  return {
    async query(statement, parameters = []) {
      return sql.query(statement, parameters, {
        fullResults: true,
        fetchOptions: { signal: AbortSignal.timeout(15000) },
      })
    },
  }
}

async function ensureReady() {
  const database = getPool()
  if (!initPromise) {
    initPromise = (async () => {
      await database.query(`CREATE TABLE IF NOT EXISTS invoice_vessels (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        vessel_date DATE NOT NULL,
        goods TEXT NOT NULL,
        total_qty NUMERIC(14, 2) NOT NULL CHECK (total_qty > 0),
        invoiced_qty NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (invoiced_qty >= 0),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`)
      await database.query(`CREATE TABLE IF NOT EXISTS vessel_invoices (
        id BIGSERIAL PRIMARY KEY,
        vessel_id BIGINT NOT NULL REFERENCES invoice_vessels(id) ON DELETE CASCADE,
        invoice_num TEXT NOT NULL,
        invoice_date DATE NOT NULL,
        total_qty NUMERIC(14, 2) NOT NULL CHECK (total_qty > 0),
        cleared_qty NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (cleared_qty >= 0),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (vessel_id, invoice_num)
      )`)
      await database.query(`CREATE TABLE IF NOT EXISTS invoice_clearances (
        id BIGSERIAL PRIMARY KEY,
        invoice_id BIGINT NOT NULL REFERENCES vessel_invoices(id) ON DELETE CASCADE,
        document_num TEXT NOT NULL,
        qty NUMERIC(14, 2) NOT NULL CHECK (qty > 0),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`)
      await database.query(
        'ALTER TABLE invoice_vessels ADD COLUMN IF NOT EXISTS invoiced_qty NUMERIC(14, 2) NOT NULL DEFAULT 0'
      )
      await database.query(
        'ALTER TABLE vessel_invoices ADD COLUMN IF NOT EXISTS cleared_qty NUMERIC(14, 2) NOT NULL DEFAULT 0'
      )
      await database.query(`
        UPDATE invoice_vessels vessel
        SET invoiced_qty = totals.total
        FROM (
          SELECT vessel_id, COALESCE(SUM(total_qty), 0) AS total
          FROM vessel_invoices
          GROUP BY vessel_id
        ) totals
        WHERE vessel.id = totals.vessel_id
          AND vessel.invoiced_qty = 0
      `)
      await database.query(`
        UPDATE vessel_invoices invoice
        SET cleared_qty = totals.total
        FROM (
          SELECT invoice_id, COALESCE(SUM(qty), 0) AS total
          FROM invoice_clearances
          GROUP BY invoice_id
        ) totals
        WHERE invoice.id = totals.invoice_id
          AND invoice.cleared_qty = 0
      `)
      await database.query(
        'CREATE INDEX IF NOT EXISTS invoice_clearances_invoice_id_idx ON invoice_clearances (invoice_id)'
      )
    })().catch((error) => {
      initPromise = null
      throw error
    })
  }
  await initPromise
  return database
}

function rowToVessel(row) {
  return {
    id: Number(row.id),
    name: row.name,
    date: row.vessel_date,
    goods: row.goods,
    totalQty: Number(row.total_qty),
    invoices: [],
  }
}

function rowToInvoice(row) {
  return {
    id: Number(row.id),
    vesselId: Number(row.vessel_id),
    num: row.invoice_num,
    date: row.invoice_date,
    totalQty: Number(row.total_qty),
    clearances: [],
  }
}

function rowToClearance(row) {
  return {
    id: Number(row.id),
    doc: row.document_num,
    qty: Number(row.qty),
    timestamp: row.created_at.toISOString(),
  }
}

function validationError(message, code = 'INVALID_INPUT') {
  const error = new Error(message)
  error.code = code
  return error
}

function requireText(value, label) {
  const text = String(value ?? '').trim()
  if (!text) throw validationError(`${label} სავალდებულოა`)
  return text
}

function requireQuantity(value, label = 'რაოდენობა') {
  const quantity = Number(value)
  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw validationError(`${label} უნდა იყოს ნულზე მეტი`)
  }
  return quantity
}

function requireDate(value, label = 'თარიღი') {
  const date = String(value ?? '')
  const parts = date.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!parts) throw validationError(`${label} არასწორია`)
  const [, year, month, day] = parts.map(Number)
  const parsed = new Date(Date.UTC(year, month - 1, day))
  if (parsed.getUTCFullYear() !== year || parsed.getUTCMonth() !== month - 1 || parsed.getUTCDate() !== day) {
    throw validationError(`${label} არასწორია`)
  }
  return date
}

export const invoiceDb = {
  async getVessels() {
    const database = await ensureReady()
    const { rows: vesselRows } = await database.query(
      'SELECT * FROM invoice_vessels ORDER BY created_at DESC, id DESC'
    )
    const vessels = vesselRows.map(rowToVessel)
    if (vessels.length === 0) return vessels

    const vesselIds = vessels.map((vessel) => vessel.id)
    const { rows: invoiceRows } = await database.query(
      'SELECT * FROM vessel_invoices WHERE vessel_id = ANY($1::bigint[]) ORDER BY created_at ASC, id ASC',
      [vesselIds]
    )
    const invoices = invoiceRows.map(rowToInvoice)
    const invoiceIds = invoices.map((invoice) => invoice.id)
    if (invoiceIds.length > 0) {
      const { rows: clearanceRows } = await database.query(
        'SELECT * FROM invoice_clearances WHERE invoice_id = ANY($1::bigint[]) ORDER BY created_at ASC, id ASC',
        [invoiceIds]
      )
      const clearancesByInvoice = new Map()
      for (const row of clearanceRows) {
        const clearance = rowToClearance(row)
        const records = clearancesByInvoice.get(Number(row.invoice_id)) || []
        records.push(clearance)
        clearancesByInvoice.set(Number(row.invoice_id), records)
      }
      for (const invoice of invoices) {
        invoice.clearances = clearancesByInvoice.get(invoice.id) || []
      }
    }

    const invoicesByVessel = new Map()
    for (const invoice of invoices) {
      const records = invoicesByVessel.get(invoice.vesselId) || []
      records.push(invoice)
      invoicesByVessel.set(invoice.vesselId, records)
    }
    for (const vessel of vessels) {
      vessel.invoices = invoicesByVessel.get(vessel.id) || []
    }
    return vessels
  },

  async createVessel(data) {
    const database = await ensureReady()
    const { rows } = await database.query(
      `INSERT INTO invoice_vessels (name, vessel_date, goods, total_qty)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        requireText(data.name, 'გემის სახელი').toUpperCase(),
        requireDate(data.date),
        requireText(data.goods, 'საქონლის დასახელება'),
        requireQuantity(data.totalQty, 'ტვირთის რაოდენობა'),
      ]
    )
    return rowToVessel(rows[0])
  },

  async createInvoice(vesselId, data) {
    const database = await ensureReady()
    const quantity = requireQuantity(data.totalQty)
    const invoiceNum = requireText(data.num, 'ინვოისის ნომერი')
    const invoiceDate = requireDate(data.date)
    const { rows } = await database.query(
      `WITH reserved AS (
        UPDATE invoice_vessels
        SET invoiced_qty = invoiced_qty + $2
        WHERE id = $1 AND invoiced_qty + $2 <= total_qty
        RETURNING id
      )
      INSERT INTO vessel_invoices (vessel_id, invoice_num, invoice_date, total_qty)
      SELECT id, $3, $4, $2 FROM reserved
      RETURNING *`,
      [Number(vesselId), quantity, invoiceNum, invoiceDate]
    )
    if (rows.length === 0) {
      const { rows: vesselRows } = await database.query(
        'SELECT id FROM invoice_vessels WHERE id = $1',
        [Number(vesselId)]
      )
      if (vesselRows.length === 0) throw validationError('გემი ვერ მოიძებნა', 'NOT_FOUND')
      const { rows: remainingRows } = await database.query(
        'SELECT total_qty - invoiced_qty AS remaining FROM invoice_vessels WHERE id = $1',
        [Number(vesselId)]
      )
      const remaining = Number(remainingRows[0].remaining)
      if (quantity > remaining) {
        throw validationError(`რაოდენობა აჭარბებს გემის დარჩენილ ტვირთს (${remaining} კგ)`, 'QUANTITY_EXCEEDED')
      }
      throw validationError('ინვოისის დამატება ვერ მოხერხდა')
    }
    return rowToInvoice(rows[0])
  },

  async deleteInvoice(invoiceId) {
    const database = await ensureReady()
    const { rows } = await database.query(
      `WITH deleted AS (
        DELETE FROM vessel_invoices WHERE id = $1
        RETURNING id, vessel_id, total_qty
      ), adjusted AS (
        UPDATE invoice_vessels
        SET invoiced_qty = GREATEST(0, invoiced_qty - (SELECT total_qty FROM deleted))
        WHERE id = (SELECT vessel_id FROM deleted)
        RETURNING id
      )
      SELECT id FROM deleted`,
      [Number(invoiceId)]
    )
    if (rows.length === 0) throw validationError('ინვოისი ვერ მოიძებნა', 'NOT_FOUND')
  },

  async createClearance(invoiceId, data) {
    const database = await ensureReady()
    const quantity = requireQuantity(data.qty, 'ჩამოსაწერი რაოდენობა')
    const documentNum = requireText(data.doc, 'საბაჟო დოკუმენტი')
    const { rows } = await database.query(
      `WITH reserved AS (
        UPDATE vessel_invoices
        SET cleared_qty = cleared_qty + $2
        WHERE id = $1 AND cleared_qty + $2 <= total_qty
        RETURNING id
      )
      INSERT INTO invoice_clearances (invoice_id, document_num, qty)
      SELECT id, $3, $2 FROM reserved
      RETURNING *`,
      [Number(invoiceId), quantity, documentNum]
    )
    if (rows.length === 0) {
      const { rows: invoiceRows } = await database.query(
        'SELECT id FROM vessel_invoices WHERE id = $1',
        [Number(invoiceId)]
      )
      if (invoiceRows.length === 0) throw validationError('ინვოისი ვერ მოიძებნა', 'NOT_FOUND')
      const { rows: remainingRows } = await database.query(
        'SELECT total_qty - cleared_qty AS remaining FROM vessel_invoices WHERE id = $1',
        [Number(invoiceId)]
      )
      const remaining = Number(remainingRows[0].remaining)
      if (quantity > remaining) {
        throw validationError(`რაოდენობა აჭარბებს ინვოისის დარჩენილ ნაშთს (${remaining} კგ)`, 'QUANTITY_EXCEEDED')
      }
      throw validationError('ჩამოწერის დამატება ვერ მოხერხდა')
    }
    return rowToClearance(rows[0])
  },

  async deleteClearance(clearanceId) {
    const database = await ensureReady()
    const { rows } = await database.query(
      `WITH deleted AS (
        DELETE FROM invoice_clearances WHERE id = $1
        RETURNING invoice_id, qty
      ), adjusted AS (
        UPDATE vessel_invoices
        SET cleared_qty = GREATEST(0, cleared_qty - (SELECT qty FROM deleted))
        WHERE id = (SELECT invoice_id FROM deleted)
        RETURNING id
      )
      SELECT invoice_id FROM deleted`,
      [Number(clearanceId)]
    )
    if (rows.length === 0) throw validationError('ჩამოწერა ვერ მოიძებნა', 'NOT_FOUND')
  },
}