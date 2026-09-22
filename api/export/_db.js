import { Pool } from 'pg'

const VALID_CATEGORIES = ['exporters', 'declarants', 'goods']

const DEFAULT_DROPDOWNS = {
  exporters: ['შპს ტრანს ლოჯისტიკი', 'შპს ჯორჯიან კარგო'],
  declarants: ['შპს გლობალ ფორვარდინგი', 'შპს ალიანს ლოჯისტიკი'],
  goods: ['ფეროშენადნობი', 'ცემენტი', 'მინერალური წყალი'],
}

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
      await pool.query(`CREATE TABLE IF NOT EXISTS export_options (
        id BIGSERIAL PRIMARY KEY,
        category TEXT NOT NULL CHECK (category IN ('exporters', 'declarants', 'goods')),
        value TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (category, value)
      )`)
      await pool.query(`CREATE TABLE IF NOT EXISTS export_options_meta (
        id SMALLINT PRIMARY KEY CHECK (id = 1)
      )`)
      await pool.query(
        `INSERT INTO export_items (
          exporter, declarant, goods, code, reg_date, declaration_num, days, exp_date, weight, status, ship_name, departure_date, note
        )
        SELECT 'შპს ტრანს ლოჯისტიკი', 'შპს გლობალ ფორვარდინგი', 'ფეროშენადნობი', 'C-102938',
               '2026-09-21', '10293847', 30, '2026-10-21', '24,500.00', 'active', '', '',
               'ტვირთი მზად არის საექსპორტო პროცედურისთვის'
        WHERE NOT EXISTS (SELECT 1 FROM export_items)`
      )
      const { rows: metaRows } = await pool.query(
        'SELECT id FROM export_options_meta WHERE id = 1 LIMIT 1'
      )
      if (metaRows.length === 0) {
        const { rows: optionRows } = await pool.query(
          'SELECT 1 FROM export_options LIMIT 1'
        )
        await pool.query(
          'INSERT INTO export_options_meta (id) VALUES (1) ON CONFLICT (id) DO NOTHING'
        )
        if (optionRows.length === 0) {
          for (const category of VALID_CATEGORIES) {
            for (const value of DEFAULT_DROPDOWNS[category]) {
              await pool.query(
                'INSERT INTO export_options (category, value) VALUES ($1, $2) ON CONFLICT (category, value) DO NOTHING',
                [category, value]
              )
            }
          }
        }
      }
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

export const db = {
  async getItems() {
    await ensureReady()
    const { rows } = await pool.query(
      'SELECT * FROM export_items ORDER BY created_at ASC, id ASC'
    )
    return rows.map(rowToItem)
  },

  async createItem(data) {
    await ensureReady()
    const { rows } = await pool.query(
      `INSERT INTO export_items (
        exporter, declarant, goods, code, reg_date, declaration_num, days, exp_date, weight, status, ship_name, departure_date, note
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [
        data.exporter ?? '',
        data.declarant ?? '',
        data.goods ?? '',
        data.code ?? '',
        data.regDate ?? '',
        data.declarationNum ?? '',
        Number(data.days) || 0,
        data.expDate ?? '',
        data.weight ?? '',
        data.status === 'archived' ? 'archived' : 'active',
        data.shipName ?? '',
        data.departureDate ?? '',
        data.note ?? '',
      ]
    )
    return rowToItem(rows[0])
  },

  async updateItem(id, patch) {
    await ensureReady()
    const { rows } = await pool.query(
      `UPDATE export_items
       SET status = COALESCE($2, status),
           ship_name = COALESCE($3, ship_name),
           departure_date = COALESCE($4, departure_date)
       WHERE id = $1
       RETURNING *`,
      [
        Number(id),
        patch.status === 'archived' || patch.status === 'active' ? patch.status : null,
        patch.shipName ?? null,
        patch.departureDate ?? null,
      ]
    )
    if (rows.length === 0) return null
    return rowToItem(rows[0])
  },

  async getOptions() {
    await ensureReady()
    const { rows } = await pool.query(
      'SELECT category, value FROM export_options ORDER BY id ASC'
    )
    const options = { exporters: [], declarants: [], goods: [] }
    for (const row of rows) {
      if (options[row.category]) {
        options[row.category].push(row.value)
      }
    }
    return options
  },

  async addOption(category, value) {
    await ensureReady()
    if (!VALID_CATEGORIES.includes(category)) {
      const error = new Error('invalid_category')
      error.code = 'INVALID_CATEGORY'
      throw error
    }
    const trimmed = String(value || '').trim()
    if (!trimmed) {
      const error = new Error('empty_value')
      error.code = 'EMPTY_VALUE'
      throw error
    }
    await pool.query(
      'INSERT INTO export_options (category, value) VALUES ($1, $2) ON CONFLICT (category, value) DO NOTHING',
      [category, trimmed]
    )
    const { rows } = await pool.query(
      'SELECT value FROM export_options WHERE category = $1 ORDER BY id ASC',
      [category]
    )
    return rows.map((row) => row.value)
  },

  async removeOption(category, value) {
    await ensureReady()
    if (!VALID_CATEGORIES.includes(category)) {
      const error = new Error('invalid_category')
      error.code = 'INVALID_CATEGORY'
      throw error
    }
    await pool.query(
      'DELETE FROM export_options WHERE category = $1 AND value = $2',
      [category, value]
    )
    const { rows } = await pool.query(
      'SELECT value FROM export_options WHERE category = $1 ORDER BY id ASC',
      [category]
    )
    return rows.map((row) => row.value)
  },
}
