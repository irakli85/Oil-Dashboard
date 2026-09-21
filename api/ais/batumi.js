import WebSocket from 'ws'

export const config = {
  maxDuration: 60,
}

const AISSTREAM_API_KEY = '363ba34a53c0ec1b727a67e2c2ae7132b49a8cb0'
const COLLECT_WINDOW_MS = 12000

const BATUMI_PORT = {
  lat: 41.65,
  lon: 41.63,
}

function toRadians(deg) {
  return (deg * Math.PI) / 180
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function readValue(source, ...keys) {
  if (!source || typeof source !== 'object') return null

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(source, key) && source[key] != null && source[key] !== '') {
      return source[key]
    }
  }

  return null
}

function normalizeVessel(raw, radiusKm) {
  if (!raw) return null

  const meta = raw?.MetaData || {}
  const message = raw?.Message || {}
  const position = raw?.Message?.PositionReport || raw?.PositionReport || {}

  const lat =
    readValue(meta, 'Latitude', 'latitude', 'Lat', 'lat') ??
    readValue(position, 'Latitude', 'latitude', 'Lat', 'lat') ??
    readValue(message, 'Latitude', 'latitude', 'Lat', 'lat') ??
    readValue(raw, 'Latitude', 'latitude', 'Lat', 'lat')

  const lon =
    readValue(meta, 'Longitude', 'longitude', 'Lon', 'lon') ??
    readValue(position, 'Longitude', 'longitude', 'Lon', 'lon') ??
    readValue(message, 'Longitude', 'longitude', 'Lon', 'lon') ??
    readValue(raw, 'Longitude', 'longitude', 'Lon', 'lon')

  if (lat == null || lon == null) return null

  const latitude = Number(lat)
  const longitude = Number(lon)

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null

  const distanceKm = haversineKm(BATUMI_PORT.lat, BATUMI_PORT.lon, latitude, longitude)
  if (distanceKm > radiusKm) return null

  const mmsi =
    readValue(meta, 'MMSI', 'mmsi', 'MMSI_String', 'mmsi_string') ??
    readValue(raw, 'MMSI', 'mmsi', 'MMSI_String', 'mmsi_string')

  const shipName = String(
    readValue(meta, 'ShipName', 'shipName', 'Name', 'name') ??
      readValue(raw, 'ShipName', 'shipName', 'Name', 'name') ??
      'Unknown vessel'
  ).trim()

  const sog =
    readValue(position, 'Sog', 'sog', 'SpeedOverGround', 'speedOverGround') ??
    readValue(message, 'Sog', 'sog', 'SpeedOverGround', 'speedOverGround') ??
    readValue(meta, 'Sog', 'sog') ??
    readValue(raw, 'Sog', 'sog')

  const cog =
    readValue(position, 'Cog', 'cog', 'CourseOverGround', 'courseOverGround') ??
    readValue(message, 'Cog', 'cog', 'CourseOverGround', 'courseOverGround') ??
    readValue(meta, 'Cog', 'cog') ??
    readValue(raw, 'Cog', 'cog')

  return {
    mmsi: mmsi ?? null,
    shipName: shipName || 'Unknown vessel',
    latitude,
    longitude,
    sog: sog != null ? Number(sog) : null,
    cog: cog != null ? Number(cog) : null,
    messageType: raw?.MessageType || 'PositionReport',
    lastSeen: new Date().toISOString(),
    distanceKm: Number(distanceKm.toFixed(2)),
  }
}

function collectVessels(radiusKm) {
  return new Promise((resolve, reject) => {
    const vessels = new Map()
    let settled = false

    const finish = () => {
      if (settled) return
      settled = true
      resolve([...vessels.values()])
    }

    const timer = setTimeout(() => {
      try {
        socket.terminate()
      } catch {}
      finish()
    }, COLLECT_WINDOW_MS)

    const socket = new WebSocket('wss://stream.aisstream.io/v0/stream', {
      handshakeTimeout: 10000,
    })

    socket.on('open', () => {
      socket.send(
        JSON.stringify({
          APIKey: AISSTREAM_API_KEY,
          BoundingBoxes: [
            [
              [41.2, 41.2],
              [42.0, 42.0],
            ],
          ],
          FilterMessageTypes: ['PositionReport'],
        })
      )
    })

    socket.on('message', (data) => {
      try {
        const event = JSON.parse(data.toString())
        const vessel = normalizeVessel(event, radiusKm)
        if (vessel) {
          const key = vessel.mmsi || vessel.shipName
          if (key) {
            vessels.set(key, vessel)
          }
        }
      } catch {
        // ignore malformed frames
      }
    })

    socket.on('error', (error) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      reject(error)
    })

    socket.on('close', () => {
      clearTimeout(timer)
      finish()
    })
  })
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const rawRadius = Number(req.query?.radiusKm ?? 20)
  const radiusKm = Number.isFinite(rawRadius) && rawRadius > 0 ? Math.min(rawRadius, 50) : 20

  try {
    const vessels = await collectVessels(radiusKm)
    return res.status(200).json({
      source: 'aisstream',
      port: 'Batumi',
      radiusKm,
      updatedAt: new Date().toISOString(),
      vessels,
    })
  } catch (error) {
    console.error('[ais batumi]', error)
    return res.status(502).json({
      error: 'AIS წყარო დროებით მიუწვდომელია',
      vessels: [],
      radiusKm,
      updatedAt: new Date().toISOString(),
    })
  }
}
