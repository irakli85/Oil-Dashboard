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
