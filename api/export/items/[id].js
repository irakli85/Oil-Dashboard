import { Pool } from 'pg'

let pool = null
let initPromise = null

async function ensureReady() {
  if (!pool) {
    pool = new Pool({
      connectionString:
        process.env.POSTGRES_URL ||
        process.env.POSTGRES_URL_NON_POOLING ||
        process.env.DATABASE_URL,
      max: 3,
    })
  }
  if (!initPromise) {
    initPromise = (async () => {
      await pool.query(`CREATE TABLE IF NOT EXISTS export_items (
        id BIGSERIAL PRIMARY KEY,
        exporter TEXT NOT NULL DEFAULT '',
        declarant TEXT NOT NULL DEFAULT '',
        goods TEXT NOT NULL DEFAULT '',
        code TEXT NOT NULL DEFAULT '',
        reg_date TEXT NOT NULL DEFAULT '',
        declaration_num TEXT NOT NULL DEFAULT '',
        days INTEGER NOT NULL DEFAULT 0,
        exp_date TEXT NOT NULL DEFAULT '',
        weight TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
        ship_name TEXT NOT NULL DEFAULT '',
        departure_date TEXT NOT NULL DEFAULT '',
        note TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`)
    })()
  }
  await initPromise
}

function rowToItem(row) {
  return {
    id: Number(row.id),
    exporter: row.exporter,
    declarant: row.declarant,
    goods: row.goods,
    code: row.code,
    regDate: row.reg_date,
    declarationNum: row.declaration_num,
    days: Number(row.days),
    expDate: row.exp_date,
    weight: row.weight,
    status: row.status,
    shipName: row.ship_name,
    departureDate: row.departure_date,
    note: row.note,
  }
}

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      await ensureReady()
      const { rowCount } = await pool.query(
        'DELETE FROM export_items WHERE id = $1',
        [Number(req.query.id)]
      )
      if (rowCount === 0) {
        return res.status(404).json({ error: 'ჩანაწერი ვერ მოიძებნა' })
      }
      return res.status(200).json({ deleted: true })
    } catch (error) {
      console.error('[export item delete]', error)
      return res.status(500).json({ error: 'სერვერის შეცდომა' })
    }
  }

  if (req.method !== 'PATCH') {
    res.setHeader('Allow', 'PATCH')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    await ensureReady()
    const body = req.body || {}
    const status =
      body.status === 'archived' || body.status === 'active' ? body.status : null
    const { rows } = await pool.query(
      `UPDATE export_items
       SET status = COALESCE($2, status),
           ship_name = COALESCE($3, ship_name),
           departure_date = COALESCE($4, departure_date)
       WHERE id = $1
       RETURNING *`,
      [
        Number(req.query.id),
        status,
        typeof body.shipName === 'string' ? body.shipName : null,
        typeof body.departureDate === 'string' ? body.departureDate : null,
      ]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: 'ჩანაწერი ვერ მოიძებნა' })
    }
    return res.status(200).json({ item: rowToItem(rows[0]) })
  } catch (error) {
    console.error('[export item update]', error)
    return res.status(500).json({ error: 'სერვერის შეცდომა' })
  }
}
