import { dismissVessel, getVesselIdentifier } from '../../../server/vessel-registry.js'
import { requireAdmin } from '../../../server/admin-auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
  if (!requireAdmin(req, res)) return

  const vessel = { mmsi: req.body?.mmsi, shipName: req.body?.shipName }
  if (!getVesselIdentifier(vessel)) {
    return res.status(400).json({ error: 'MMSI or ship name is required' })
  }

  try {
    await dismissVessel(vessel)
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('[ais dismiss vessel]', error)
    return res.status(503).json({ error: 'Could not save vessel dismissal' })
  }
}