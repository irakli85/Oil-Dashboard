import { findVesselNameByImo } from '../../server/vessel-registry.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const imo = String(req.query?.imo ?? '').trim()
  if (!/^\d{7}$/.test(imo)) {
    return res.status(400).json({ error: 'A valid 7-digit IMO is required' })
  }

  try {
    const shipName = await findVesselNameByImo(imo)
    return res.status(200).json({ shipName })
  } catch (error) {
    console.error('[AIS vessel name lookup]', error)
    return res.status(503).json({ error: 'Vessel name lookup is temporarily unavailable' })
  }
}
