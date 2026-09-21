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
      await pool.query(`CREATE TABLE IF NOT EXISTS export_options (
        id BIGSERIAL PRIMARY KEY,
        category TEXT NOT NULL CHECK (category IN ('exporters', 'declarants', 'goods')),
        value TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (category, value)
      )`)
    })()
  }
  await initPromise
}

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    await ensureReady()
    const { category, value } = req.query

    if (!['exporters', 'declarants', 'goods'].includes(category)) {
      return res.status(400).json({ error: 'უცნობი კატეგორია' })
    }

    await pool.query(
      'DELETE FROM export_options WHERE category = $1 AND value = $2',
      [category, decodeURIComponent(value || '')]
    )
    const { rows } = await pool.query(
      'SELECT value FROM export_options WHERE category = $1 ORDER BY id ASC',
      [category]
    )
    return res.status(200).json({ category, list: rows.map((row) => row.value) })
  } catch (error) {
    console.error('[export option delete]', error)
    return res.status(500).json({ error: 'სერვერის შეცდომა' })
  }
}
