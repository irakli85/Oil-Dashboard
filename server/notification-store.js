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
    initPromise = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS vessel_notifications (
          id BIGSERIAL PRIMARY KEY,
          client_id UUID NOT NULL,
          ship_name TEXT NOT NULL,
          imo TEXT NOT NULL,
          flag TEXT NOT NULL,
          detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `)
      await pool.query(`
        CREATE INDEX IF NOT EXISTS vessel_notifications_client_time_idx
        ON vessel_notifications (client_id, detected_at DESC, id DESC)
      `)
      await pool.query(`
        CREATE TABLE IF NOT EXISTS vessel_notification_reads (
          client_id UUID NOT NULL,
          notification_id TEXT NOT NULL,
          seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          PRIMARY KEY (client_id, notification_id)
        )
      `)
      await pool.query(`
        CREATE TABLE IF NOT EXISTS vessel_proximity_state (
          vessel_key TEXT PRIMARY KEY,
          is_inside BOOLEAN NOT NULL DEFAULT FALSE
        )
      `)
      await pool.query(`
        CREATE TABLE IF NOT EXISTS vessel_arrival_events (
          id BIGSERIAL PRIMARY KEY,
          vessel_key TEXT NOT NULL,
          mmsi TEXT,
          ship_name TEXT NOT NULL,
          imo TEXT NOT NULL,
          flag TEXT NOT NULL,
          event_type TEXT NOT NULL DEFAULT 'arrival',
          detected_at TIMESTAMPTZ NOT NULL
        )
      `)
      await pool.query(`
        ALTER TABLE vessel_arrival_events
        ADD COLUMN IF NOT EXISTS mmsi TEXT
      `)
      await pool.query(`
        ALTER TABLE vessel_arrival_events
        ADD COLUMN IF NOT EXISTS event_type TEXT NOT NULL DEFAULT 'arrival'
      `)
      await pool.query(`
        CREATE INDEX IF NOT EXISTS vessel_arrival_events_time_idx
        ON vessel_arrival_events (detected_at DESC, id DESC)
      `)
      await pool.query(`
        CREATE TABLE IF NOT EXISTS vessel_notification_clears (
          client_id UUID PRIMARY KEY,
          cleared_at TIMESTAMPTZ NOT NULL
        )
      `)
    })().catch((error) => {
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
    ...(row.mmsi ? { mmsi: row.mmsi } : {}),
    shipName: row.ship_name,
    imo: row.imo,
    flag: row.flag,
    ...(row.event_type ? { eventType: row.event_type } : {}),
    isRead: row.is_read === true,
    detectedAt: new Date(row.detected_at).toISOString(),
  }
}

export async function getNotifications(clientId) {
  await ensureReady()
  const { rows } = await pool.query(
    `SELECT notification.id, notification.mmsi, notification.ship_name, notification.imo,
            notification.flag, notification.event_type, notification.detected_at,
            (read_state.seen_at IS NOT NULL) AS is_read
     FROM (
       SELECT id::TEXT AS id, NULL::TEXT AS mmsi, ship_name, imo, flag,
              NULL::TEXT AS event_type, detected_at
       FROM vessel_notifications
       WHERE client_id = $1
       UNION ALL
       SELECT 'arrival-' || event.id::TEXT AS id, event.mmsi, event.ship_name, event.imo,
              event.flag, event.event_type, event.detected_at
       FROM vessel_arrival_events AS event
     ) AS notification
     LEFT JOIN vessel_notification_reads AS read_state
       ON read_state.client_id = $1 AND read_state.notification_id = notification.id
     WHERE notification.detected_at > COALESCE(
         (SELECT cleared_at FROM vessel_notification_clears WHERE client_id = $1),
         '-infinity'::timestamptz
       )
     ORDER BY notification.detected_at DESC, notification.id DESC`,
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
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query(
      `INSERT INTO vessel_notification_clears (client_id, cleared_at)
       VALUES ($1, NOW())
       ON CONFLICT (client_id) DO UPDATE SET cleared_at = EXCLUDED.cleared_at`,
      [clientId]
    )
    await client.query('DELETE FROM vessel_notifications WHERE client_id = $1', [clientId])
    await client.query('DELETE FROM vessel_notification_reads WHERE client_id = $1', [clientId])
    await client.query('COMMIT')
  } catch (error) {
    try {
      await client.query('ROLLBACK')
    } catch (rollbackError) {
      console.error('[notifications clear rollback]', rollbackError)
    }
    throw error
  } finally {
    client.release()
  }
}

export async function markNotificationSeen(clientId, notificationId) {
  await ensureReady()
  let targetId = notificationId
  let sourceTable
  if (/^arrival-\d+$/.test(notificationId)) {
    targetId = notificationId.slice('arrival-'.length)
    sourceTable = 'vessel_arrival_events'
  } else if (/^\d+$/.test(notificationId)) {
    sourceTable = 'vessel_notifications'
  } else {
    return false
  }

  const query = sourceTable === 'vessel_arrival_events'
    ? `INSERT INTO vessel_notification_reads (client_id, notification_id)
       SELECT $1, 'arrival-' || event.id::TEXT
       FROM vessel_arrival_events AS event
       WHERE event.id::TEXT = $2
         AND event.detected_at > COALESCE(
           (SELECT cleared_at FROM vessel_notification_clears WHERE client_id = $1),
           '-infinity'::timestamptz
         )
       ON CONFLICT (client_id, notification_id) DO NOTHING
       RETURNING notification_id`
    : `INSERT INTO vessel_notification_reads (client_id, notification_id)
       SELECT $1, notification.id::TEXT
       FROM vessel_notifications AS notification
       WHERE notification.id::TEXT = $2 AND notification.client_id = $1
         AND notification.detected_at > COALESCE(
           (SELECT cleared_at FROM vessel_notification_clears WHERE client_id = $1),
           '-infinity'::timestamptz
         )
       ON CONFLICT (client_id, notification_id) DO NOTHING
       RETURNING notification_id`
  const { rows } = await pool.query(query, [clientId, targetId])
  if (rows.length > 0) return true

  const { rowCount } = await pool.query(
    `SELECT 1
     FROM vessel_notification_reads
     WHERE client_id = $1 AND notification_id = $2`,
    [clientId, notificationId]
  )
  return rowCount > 0
}

function getVesselKey(vessel) {
  const mmsi = String(vessel?.mmsi ?? '').trim()
  if (mmsi) return `mmsi:${mmsi}`

  const imo = String(vessel?.imo ?? '').trim()
  if (imo) return `imo:${imo}`

  const shipName = String(vessel?.shipName ?? '').trim().replace(/\s+/g, ' ').toUpperCase()
  return shipName && shipName !== 'UNKNOWN VESSEL' ? `name:${shipName}` : null
}

export async function updateVesselProximity(vessel) {
  const vesselKey = getVesselKey(vessel)
  const distanceKm = Number(vessel?.distanceKmExact ?? vessel?.distanceKm)
  if (!vesselKey || !Number.isFinite(distanceKm)) return null

  await ensureReady()
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query(
      `INSERT INTO vessel_proximity_state (vessel_key, is_inside)
       VALUES ($1, FALSE)
       ON CONFLICT (vessel_key) DO NOTHING`,
      [vesselKey]
    )
    const { rows: stateRows } = await client.query(
      'SELECT is_inside FROM vessel_proximity_state WHERE vessel_key = $1 FOR UPDATE',
      [vesselKey]
    )
    const wasInside = stateRows[0].is_inside
    const isInside = distanceKm <= 2
    let notification = null

    if (isInside !== wasInside) {
      const detectedAt = new Date(vessel.lastSeen)
      const timestamp = Number.isFinite(detectedAt.getTime()) ? detectedAt : new Date()
      const { rows } = await client.query(
        `INSERT INTO vessel_arrival_events
           (vessel_key, mmsi, ship_name, imo, flag, event_type, detected_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, mmsi, ship_name, imo, flag, event_type, detected_at`,
        [
          vesselKey,
          vessel.mmsi == null ? null : String(vessel.mmsi),
          String(vessel.shipName || 'უცნობი გემი').trim(),
          String(vessel.imo || 'უცნობია').trim(),
          String(vessel.flag || 'უცნობია').trim(),
          isInside ? 'arrival' : 'departure',
          timestamp.toISOString(),
        ]
      )
      notification = mapRow({ ...rows[0], id: `arrival-${rows[0].id}` })
    }

    if (isInside !== wasInside) {
      await client.query(
        'UPDATE vessel_proximity_state SET is_inside = $2 WHERE vessel_key = $1',
        [vesselKey, isInside]
      )
    }
    await client.query('COMMIT')
    return notification
  } catch (error) {
    try {
      await client.query('ROLLBACK')
    } catch (rollbackError) {
      console.error('[ais proximity notification rollback]', rollbackError)
    }
    throw error
  } finally {
    client.release()
  }
}
