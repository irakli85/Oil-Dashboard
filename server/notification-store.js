import { Pool } from 'pg'

let pool
let initPromise

async function ensureReady() {
  if (!pool) {
    const connectionString =
      process.env.POSTGRES_URL ||
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.DATABASE_URL
    if (!connectionString) throw new Error('database_not_configured')
    pool = new Pool({ connectionString, max: 3 })
  }

  if (!initPromise) {
    initPromise = pool.query(`
      CREATE TABLE IF NOT EXISTS vessel_notifications (
        id BIGSERIAL PRIMARY KEY,
        client_id UUID NOT NULL,
        ship_name TEXT NOT NULL,
        imo TEXT NOT NULL,
        flag TEXT NOT NULL,
        detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `).then(() => pool.query(`
      CREATE INDEX IF NOT EXISTS vessel_notifications_client_time_idx
      ON vessel_notifications (client_id, detected_at DESC, id DESC)
    `)).catch((error) => {
      initPromise = null
      throw error
    })
  }

  await initPromise
}

export function isValidNotificationClientId(clientId) {
  return typeof clientId === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(clientId)
}

function mapRow(row) {
  return {
    id: String(row.id),
    shipName: row.ship_name,
    imo: row.imo,
    flag: row.flag,
    detectedAt: new Date(row.detected_at).toISOString(),
  }
}

export async function getNotifications(clientId) {
  await ensureReady()
  const { rows } = await pool.query(
    `SELECT id, ship_name, imo, flag, detected_at
     FROM vessel_notifications
     WHERE client_id = $1
     ORDER BY detected_at DESC, id DESC`,
    [clientId]
  )
  return rows.map(mapRow)
}

export async function createNotification({ clientId, shipName, imo, flag }) {
  await ensureReady()
  const { rows } = await pool.query(
    `INSERT INTO vessel_notifications (client_id, ship_name, imo, flag)
     VALUES ($1, $2, $3, $4)
     RETURNING id, ship_name, imo, flag, detected_at`,
    [clientId, shipName, imo, flag]
  )
  return mapRow(rows[0])
}

export async function clearNotifications(clientId) {
  await ensureReady()
  await pool.query('DELETE FROM vessel_notifications WHERE client_id = $1', [clientId])
}
