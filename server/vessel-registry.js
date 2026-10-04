import { neon } from '@neondatabase/serverless'

let sql
let initPromise
let dismissalLoadPromise
let warnedDatabase = false
const registryCache = new Map()
let dismissedIdentifiers = new Set()

function getSql() {
  if (!sql) {
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL
    if (!connectionString) throw new Error('database_not_configured')
    sql = neon(connectionString)
  }
  return sql
}

async function ensureReady() {
  if (!initPromise) {
    initPromise = (async () => {
      await getSql().query(`
        CREATE TABLE IF NOT EXISTS vessel_registry (
          mmsi TEXT PRIMARY KEY,
          imo TEXT,
          ship_type TEXT,
          ship_name TEXT,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `)
      await getSql().query(`
        CREATE TABLE IF NOT EXISTS dismissed_vessels (
          identifier TEXT PRIMARY KEY,
          mmsi TEXT,
          ship_name TEXT,
          dismissed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `)
      await getSql().query(`
        CREATE TABLE IF NOT EXISTS latest_vessel_positions (
          mmsi TEXT PRIMARY KEY,
          imo TEXT,
          ship_type TEXT,
          ship_name TEXT,
          latitude DOUBLE PRECISION NOT NULL,
          longitude DOUBLE PRECISION NOT NULL,
          sog DOUBLE PRECISION,
          cog DOUBLE PRECISION,
          message_type TEXT,
          distance_km DOUBLE PRECISION NOT NULL,
          last_seen TIMESTAMPTZ NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `)
    })().catch((error) => {
      initPromise = null
      throw error
    })
  }
  await initPromise
}

function cacheVessel(vessel) {
  if (!vessel?.mmsi) return
  registryCache.set(String(vessel.mmsi), {
    imo: vessel.imo ?? null,
    shipType: vessel.shipType ?? null,
    shipName: vessel.shipName ?? null,
  })
}

export function getVesselIdentifiers(vessel) {
  const identifiers = []
  const mmsi = String(vessel?.mmsi ?? '').trim()
  if (mmsi) identifiers.push(`mmsi:${mmsi}`)

  const normalizedName = String(vessel?.shipName ?? '').trim().replace(/\s+/g, ' ').toUpperCase()
  if (normalizedName && normalizedName !== 'UNKNOWN VESSEL') identifiers.push(`name:${normalizedName}`)
  return identifiers
}

export function getVesselIdentifier(vessel) {
  return getVesselIdentifiers(vessel)[0] || null
}

async function loadDismissedIdentifiers() {
  if (!dismissalLoadPromise) {
    dismissalLoadPromise = (async () => {
      await ensureReady()
      const rows = await getSql().query('SELECT identifier, mmsi, ship_name FROM dismissed_vessels')
      dismissedIdentifiers = new Set(rows.flatMap((row) => [
        row.identifier,
        ...getVesselIdentifiers({ mmsi: row.mmsi, shipName: row.ship_name }),
      ]))
    })().catch((error) => {
      dismissalLoadPromise = null
      throw error
    })
  }
  await dismissalLoadPromise
}

export async function isVesselDismissed(vessel) {
  const identifiers = getVesselIdentifiers(vessel)
  if (identifiers.length === 0) return false
  await loadDismissedIdentifiers()
  return identifiers.some((identifier) => dismissedIdentifiers.has(identifier))
}

export async function filterDismissedVessels(vessels) {
  await ensureReady()
  const rows = await getSql().query('SELECT identifier, mmsi, ship_name FROM dismissed_vessels')
  dismissedIdentifiers = new Set(rows.flatMap((row) => [
    row.identifier,
    ...getVesselIdentifiers({ mmsi: row.mmsi, shipName: row.ship_name }),
  ]))
  dismissalLoadPromise = Promise.resolve()
  return vessels.filter((vessel) => {
    return !getVesselIdentifiers(vessel).some((identifier) => dismissedIdentifiers.has(identifier))
  })
}

export async function dismissVessel(vessel) {
  const identifiers = getVesselIdentifiers(vessel)
  if (identifiers.length === 0) throw new Error('vessel_identity_required')

  await loadDismissedIdentifiers()
  const mmsi = String(vessel?.mmsi ?? '').trim() || null
  const shipName = String(vessel?.shipName ?? '').trim() || null
  for (const identifier of identifiers) {
    await getSql().query(
      `INSERT INTO dismissed_vessels (identifier, mmsi, ship_name)
       VALUES ($1, $2, $3)
       ON CONFLICT (identifier) DO UPDATE SET
         mmsi = COALESCE(EXCLUDED.mmsi, dismissed_vessels.mmsi),
         ship_name = COALESCE(EXCLUDED.ship_name, dismissed_vessels.ship_name),
         dismissed_at = NOW()`,
      [identifier, mmsi, shipName]
    )
    dismissedIdentifiers.add(identifier)
  }
  return identifiers[0]
}

export async function enrichVessel(vessel) {
  if (!vessel?.mmsi) return vessel
  const key = String(vessel.mmsi)
  const cached = registryCache.get(key)
  if (cached) {
    return {
      ...vessel,
      imo: vessel.imo ?? cached.imo,
      shipType: vessel.shipType ?? cached.shipType,
      shipName: vessel.shipName || cached.shipName || vessel.shipName,
    }
  }

  try {
    await ensureReady()
    const rows = await getSql().query(
      'SELECT imo, ship_type, ship_name FROM vessel_registry WHERE mmsi = $1',
      [key]
    )
    const row = rows[0]
    if (!row) return vessel

    const enriched = {
      ...vessel,
      imo: vessel.imo ?? row.imo,
      shipType: vessel.shipType ?? row.ship_type,
      shipName: vessel.shipName || row.ship_name || vessel.shipName,
    }
    cacheVessel(enriched)
    return enriched
  } catch (error) {
    if (!warnedDatabase) {
      console.error('[vessel registry] lookup unavailable:', error.message)
      warnedDatabase = true
    }
    return vessel
  }
}

export async function saveVesselRegistry(vessel) {
  if (!vessel?.mmsi || (!vessel.imo && !vessel.shipType && !vessel.shipName)) return

  try {
    await ensureReady()
    const key = String(vessel.mmsi)
    await getSql().query(
      `INSERT INTO vessel_registry (mmsi, imo, ship_type, ship_name)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (mmsi) DO UPDATE SET
         imo = COALESCE(EXCLUDED.imo, vessel_registry.imo),
         ship_type = COALESCE(EXCLUDED.ship_type, vessel_registry.ship_type),
         ship_name = COALESCE(EXCLUDED.ship_name, vessel_registry.ship_name),
         updated_at = NOW()`,
      [key, vessel.imo ?? null, vessel.shipType ?? null, vessel.shipName ?? null]
    )
    cacheVessel(vessel)
  } catch (error) {
    if (!warnedDatabase) {
      console.error('[vessel registry] save unavailable:', error.message)
      warnedDatabase = true
    }
  }
}

export async function loadLatestVesselPositions() {
  try {
    await ensureReady()
    const rows = await getSql().query(`
      SELECT mmsi, imo, ship_type, ship_name, latitude, longitude,
             sog, cog, message_type, distance_km, last_seen
      FROM latest_vessel_positions
      WHERE distance_km <= 50
      ORDER BY last_seen DESC
      LIMIT 50
    `)

    return rows.map((row) => ({
      mmsi: row.mmsi,
      imo: row.imo,
      shipType: row.ship_type,
      shipName: row.ship_name || 'Unknown vessel',
      latitude: Number(row.latitude),
      longitude: Number(row.longitude),
      sog: row.sog == null ? null : Number(row.sog),
      cog: row.cog == null ? null : Number(row.cog),
      messageType: row.message_type || 'PositionReport',
      distanceKm: Number(row.distance_km),
      lastSeen: new Date(row.last_seen).toISOString(),
    }))
  } catch (error) {
    if (!warnedDatabase) {
      console.error('[vessel snapshot] load unavailable:', error.message)
      warnedDatabase = true
    }
    return []
  }
}

export async function saveLatestVesselPositions(vessels) {
  const snapshot = vessels
    .filter((vessel) => vessel?.mmsi &&
      Number.isFinite(Number(vessel.latitude)) &&
      Number.isFinite(Number(vessel.longitude)) &&
      Number.isFinite(Number(vessel.distanceKm)))
    .map((vessel) => ({
      mmsi: String(vessel.mmsi),
      imo: vessel.imo == null ? null : String(vessel.imo),
      ship_type: vessel.shipType == null ? null : String(vessel.shipType),
      ship_name: vessel.shipName || 'Unknown vessel',
      latitude: Number(vessel.latitude),
      longitude: Number(vessel.longitude),
      sog: vessel.sog == null ? null : Number(vessel.sog),
      cog: vessel.cog == null ? null : Number(vessel.cog),
      message_type: vessel.messageType || 'PositionReport',
      distance_km: Number(vessel.distanceKm),
      last_seen: vessel.lastSeen || new Date().toISOString(),
    }))

  try {
    await ensureReady()
    await getSql().query(`
      WITH incoming AS (
        SELECT *
        FROM jsonb_to_recordset($1::jsonb) AS position(
          mmsi TEXT,
          imo TEXT,
          ship_type TEXT,
          ship_name TEXT,
          latitude DOUBLE PRECISION,
          longitude DOUBLE PRECISION,
          sog DOUBLE PRECISION,
          cog DOUBLE PRECISION,
          message_type TEXT,
          distance_km DOUBLE PRECISION,
          last_seen TIMESTAMPTZ
        )
      ), removed AS (
        DELETE FROM latest_vessel_positions
        WHERE mmsi NOT IN (SELECT mmsi FROM incoming)
      )
      INSERT INTO latest_vessel_positions (
        mmsi, imo, ship_type, ship_name, latitude, longitude,
        sog, cog, message_type, distance_km, last_seen, updated_at
      )
      SELECT mmsi, imo, ship_type, ship_name, latitude, longitude,
             sog, cog, message_type, distance_km, last_seen, NOW()
      FROM incoming
      ON CONFLICT (mmsi) DO UPDATE SET
        imo = COALESCE(EXCLUDED.imo, latest_vessel_positions.imo),
        ship_type = COALESCE(EXCLUDED.ship_type, latest_vessel_positions.ship_type),
        ship_name = COALESCE(EXCLUDED.ship_name, latest_vessel_positions.ship_name),
        latitude = EXCLUDED.latitude,
        longitude = EXCLUDED.longitude,
        sog = EXCLUDED.sog,
        cog = EXCLUDED.cog,
        message_type = EXCLUDED.message_type,
        distance_km = EXCLUDED.distance_km,
        last_seen = EXCLUDED.last_seen,
        updated_at = NOW()
    `, [JSON.stringify(snapshot)])
  } catch (error) {
    if (!warnedDatabase) {
      console.error('[vessel snapshot] save unavailable:', error.message)
      warnedDatabase = true
    }
  }
}
