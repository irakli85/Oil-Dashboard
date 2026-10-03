import { getAdminAuthHeaders } from './adminAuth'

const AIS_API_BASE_URL = (import.meta.env.VITE_AIS_API_URL || 'https://oil-dashboard-ais.onrender.com').replace(/\/$/, '')
const BATUMI_AIS_URL = `${AIS_API_BASE_URL}/api/ais/batumi`
const BATUMI_AIS_STREAM_URL = `${AIS_API_BASE_URL}/api/ais/batumi/stream`
const VESSEL_DISMISS_URL = `${AIS_API_BASE_URL}/api/ais/vessels/dismiss`

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
  return Array.isArray(data?.vessels) ? data.vessels : []
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
          onUpdate(data.vessels)
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
