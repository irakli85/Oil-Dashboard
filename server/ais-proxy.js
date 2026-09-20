import express from 'express';
import WebSocket from 'ws';

const app = express();
const port = process.env.PORT || 3001;

const AISSTREAM_API_KEY = '363ba34a53c0ec1b727a67e2c2ae7132b49a8cb0';
const clients = new Set();
let latestVessels = [];
let socket = null;
let currentRadiusKm = 20;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

const BATUMI_PORT = {
  lat: 41.65,
  lon: 41.63,
  radiusKm: 20,
};

function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function readValue(source, ...keys) {
  if (!source || typeof source !== 'object') return null;

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(source, key) && source[key] != null && source[key] !== '') {
      return source[key];
    }
  }

  return null;
}

function normalizeVessel(raw, radiusKm = currentRadiusKm) {
  if (!raw) return null;

  const meta = raw?.MetaData || {};
  const message = raw?.Message || {};
  const position = raw?.Message?.PositionReport || raw?.PositionReport || {};

  const lat =
    readValue(meta, 'Latitude', 'latitude', 'Lat', 'lat') ??
    readValue(position, 'Latitude', 'latitude', 'Lat', 'lat') ??
    readValue(message, 'Latitude', 'latitude', 'Lat', 'lat') ??
    readValue(raw, 'Latitude', 'latitude', 'Lat', 'lat');

  const lon =
    readValue(meta, 'Longitude', 'longitude', 'Lon', 'lon') ??
    readValue(position, 'Longitude', 'longitude', 'Lon', 'lon') ??
    readValue(message, 'Longitude', 'longitude', 'Lon', 'lon') ??
    readValue(raw, 'Longitude', 'longitude', 'Lon', 'lon');

  if (lat == null || lon == null) return null;

  const latitude = Number(lat);
  const longitude = Number(lon);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

  const distanceKm = haversineKm(BATUMI_PORT.lat, BATUMI_PORT.lon, latitude, longitude);
  if (distanceKm > radiusKm) return null;

  const mmsi =
    readValue(meta, 'MMSI', 'mmsi', 'MMSI_String', 'mmsi_string') ??
    readValue(raw, 'MMSI', 'mmsi', 'MMSI_String', 'mmsi_string');

  const shipName = String(
    readValue(meta, 'ShipName', 'shipName', 'Name', 'name') ??
      readValue(raw, 'ShipName', 'shipName', 'Name', 'name') ??
      'Unknown vessel'
  ).trim();

  const sog =
    readValue(position, 'Sog', 'sog', 'SpeedOverGround', 'speedOverGround') ??
    readValue(message, 'Sog', 'sog', 'SpeedOverGround', 'speedOverGround') ??
    readValue(meta, 'Sog', 'sog') ??
    readValue(raw, 'Sog', 'sog');

  const cog =
    readValue(position, 'Cog', 'cog', 'CourseOverGround', 'courseOverGround') ??
    readValue(message, 'Cog', 'cog', 'CourseOverGround', 'courseOverGround') ??
    readValue(meta, 'Cog', 'cog') ??
    readValue(raw, 'Cog', 'cog');

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
  };
}

function broadcast(payload) {
  const message = `data: ${JSON.stringify(payload)}\n\n`;

  for (const client of clients) {
    client.write(message);
  }
}

function getRadiusFromRequest(req) {
  const raw = Number(req?.query?.radiusKm ?? currentRadiusKm);
  if (!Number.isFinite(raw) || raw <= 0) {
    return currentRadiusKm;
  }

  return Math.min(raw, 50);
}

function upsertVessel(vessel) {
  const key = vessel?.mmsi || vessel?.shipName;
  if (!key) return;

  const current = latestVessels.find((item) => {
    return (item.mmsi && item.mmsi === vessel.mmsi) || item.shipName === vessel.shipName;
  });

  if (!current) {
    latestVessels = [vessel, ...latestVessels].slice(0, 50);
    return;
  }

  latestVessels = latestVessels.map((item) => {
    if ((item.mmsi && item.mmsi === vessel.mmsi) || item.shipName === vessel.shipName) {
      return { ...item, ...vessel, lastSeen: new Date().toISOString() };
    }

    return item;
  });
}

function setRadiusFromRequest(req) {
  const nextRadius = getRadiusFromRequest(req);
  currentRadiusKm = nextRadius;
  return currentRadiusKm;
}

function connectAISStream() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    return;
  }

  socket = new WebSocket('wss://stream.aisstream.io/v0/stream');

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
    );
  });

  socket.on('message', (data) => {
    try {
      const event = JSON.parse(data.toString());

      if (event && typeof event === 'object' && (event.MessageType === 'PositionReport' || event.MetaData || event.Message)) {
        console.log('AIS raw event keys:', Object.keys(event));
        console.log('AIS raw event sample:', {
          messageType: event?.MessageType,
          shipName: readValue(event?.MetaData || event, 'ShipName', 'shipName', 'Name', 'name'),
          latitude: readValue(event?.MetaData || event, 'Latitude', 'latitude') ?? readValue(event?.Message?.PositionReport || event, 'Latitude', 'latitude'),
          longitude: readValue(event?.MetaData || event, 'Longitude', 'longitude') ?? readValue(event?.Message?.PositionReport || event, 'Longitude', 'longitude'),
        });
      }

      const vessel = normalizeVessel(event, currentRadiusKm);
      if (vessel) {
        upsertVessel(vessel);
        broadcast({
          source: 'aisstream',
          type: 'update',
          updatedAt: new Date().toISOString(),
          vessels: latestVessels,
          radiusKm: currentRadiusKm,
        });
      }
    } catch (error) {
      console.error('AIS parse error:', error);
    }
  });

  socket.on('close', () => {
    socket = null;
    setTimeout(() => connectAISStream(), 5000);
  });

  socket.on('error', () => {
    broadcast({
      source: 'aisstream',
      type: 'error',
      updatedAt: new Date().toISOString(),
      vessels: latestVessels,
    });
  });
}

app.get('/api/ais/batumi', (req, res) => {
  const radiusKm = setRadiusFromRequest(req);

  res.json({
    source: 'aisstream',
    port: 'Batumi',
    radiusKm,
    updatedAt: new Date().toISOString(),
    vessels: latestVessels.filter((vessel) => {
      return haversineKm(BATUMI_PORT.lat, BATUMI_PORT.lon, vessel.latitude, vessel.longitude) <= radiusKm;
    }),
  });
});

app.get('/api/ais/batumi/stream', (req, res) => {
  const radiusKm = setRadiusFromRequest(req);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  clients.add(res);
  res.write(`data: ${JSON.stringify({ type: 'connected', radiusKm, vessels: latestVessels })}\n\n`);

  req.on('close', () => {
    clients.delete(res);
  });
});

connectAISStream();

app.listen(port, () => {
  console.log(`AIS proxy is running on http://localhost:${port}`);
});
