import { getAdminAuthHeaders } from './adminAuth'

const AIS_API_BASE_URL = (import.meta.env.VITE_AIS_API_URL || 'https://oil-dashboard-ais.onrender.com').replace(/\/$/, '')
const BATUMI_AIS_URL = `${AIS_API_BASE_URL}/api/ais/batumi`
const BATUMI_AIS_STREAM_URL = `${AIS_API_BASE_URL}/api/ais/batumi/stream`
const VESSEL_DISMISS_URL = `${AIS_API_BASE_URL}/api/ais/vessels/dismiss`
const vesselNameLookups = new Map()

function getVesselIdentity(vessel) {
  const imo = String(vessel.imo ?? '').trim()
  if (imo) return `imo:${imo}`

  const mmsi = String(vessel.mmsi ?? '').trim()
  if (mmsi) return `mmsi:${mmsi}`

  const shipName = String(vessel.shipName ?? '').trim().replace(/\s+/g, ' ').toUpperCase()
  return shipName ? `name:${shipName}` : null
}

function deduplicateVessels(vessels) {
  const uniqueVessels = new Map()

  for (const vessel of vessels) {
    const identity = getVesselIdentity(vessel)
    if (!identity) continue

    const current = uniqueVessels.get(identity)
    if (!current) {
      uniqueVessels.set(identity, vessel)
      continue
    }

    const currentName = String(current.shipName ?? '').trim()
    const vesselName = String(vessel.shipName ?? '').trim()
    const currentHasName = currentName && currentName.toUpperCase() !== 'UNKNOWN VESSEL'
    const vesselHasName = vesselName && vesselName.toUpperCase() !== 'UNKNOWN VESSEL'
    const currentLastSeen = Date.parse(current.lastSeen || '') || 0
    const vesselLastSeen = Date.parse(vessel.lastSeen || '') || 0
    const latestVessel = vesselLastSeen > currentLastSeen ? vessel : current

    uniqueVessels.set(identity, {
      ...current,
      ...vessel,
      ...latestVessel,
      mmsi: latestVessel.mmsi ?? current.mmsi ?? vessel.mmsi,
      imo: latestVessel.imo ?? current.imo ?? vessel.imo,
      shipType: latestVessel.shipType ?? current.shipType ?? vessel.shipType,
      shipName: (vesselHasName && (!currentHasName || vesselLastSeen >= currentLastSeen))
        ? vesselName
        : currentHasName ? currentName : vesselName || currentName,
    })
  }

  return [...uniqueVessels.values()]
}

async function resolveMissingVesselNames(vessels) {
  return Promise.all(vessels.map(async (vessel) => {
    const shipName = String(vessel.shipName ?? '').trim()
    const imo = String(vessel.imo ?? '').trim()
    if (!imo || (shipName && shipName.toUpperCase() !== 'UNKNOWN VESSEL')) return vessel

    let lookup = vesselNameLookups.get(imo)
    if (!lookup) {
      lookup = fetch(`/api/ais/vessel-name?imo=${encodeURIComponent(imo)}`, {
        headers: { Accept: 'application/json' },
      }).then(async (response) => {
        if (!response.ok) throw new Error(`IMO lookup failed (${response.status})`)
        const data = await response.json()
        return typeof data?.shipName === 'string' ? data.shipName.trim() : ''
      }).catch((error) => {
        console.error(`[AIS vessel name lookup] IMO ${imo}:`, error)
        vesselNameLookups.delete(imo)
        return ''
      })
      vesselNameLookups.set(imo, lookup)
    }

    const knownName = await lookup
    return knownName ? { ...vessel, shipName: knownName } : vessel
  }))
}

export async function fetchBatumiVessels(radiusKm = 20) {
  const response = await fetch(`${BATUMI_AIS_URL}?radiusKm=${radiusKm}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch AIS data')
  }

  const data = await response.json()
  return Array.isArray(data?.vessels)
    ? resolveMissingVesselNames(data.vessels).then(deduplicateVessels)
    : []
}

export async function dismissBatumiVessel(vessel) {
  const response = await fetch(VESSEL_DISMISS_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...getAdminAuthHeaders(),
    },
    body: JSON.stringify({ mmsi: vessel.mmsi, shipName: vessel.shipName }),
  })

  if (!response.ok) {
    throw new Error('Failed to save vessel dismissal')
  }
}

export function subscribeToBatumiVessels(radiusKm = 20, onUpdate, onError) {
  let cancelled = false
  let timer = null
  let stream = null
  let updateQueue = Promise.resolve()

  const poll = async () => {
    if (cancelled) return
    try {
      const vessels = await fetchBatumiVessels(radiusKm)
      if (!cancelled) onUpdate(vessels)
    } catch (error) {
      if (!cancelled && onError) onError(error)
    }
    if (!cancelled) timer = setTimeout(poll, 20000)
  }

  if (typeof EventSource !== 'undefined') {
    stream = new EventSource(`${BATUMI_AIS_STREAM_URL}?radiusKm=${radiusKm}`)
    stream.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'error') {
          if (onError) onError(new Error('AIS stream unavailable'))
        } else if (Array.isArray(data.vessels)) {
          updateQueue = updateQueue.then(async () => {
            const vessels = await resolveMissingVesselNames(data.vessels)
            if (!cancelled) onUpdate(deduplicateVessels(vessels))
          }).catch((error) => {
            if (!cancelled && onError) onError(error)
          })
        }
      } catch (error) {
        if (onError) onError(error)
      }
    }
    stream.onerror = () => {
      if (!cancelled && onError) onError(new Error('AIS stream unavailable'))
      stream?.close()
      stream = null
      if (!cancelled && !timer) poll()
    }
  } else {
    poll()
  }

  return {
    close() {
      cancelled = true
      if (timer) clearTimeout(timer)
      if (stream) stream.close()
    },
  }
}
