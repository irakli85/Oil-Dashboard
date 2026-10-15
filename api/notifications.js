import {
  clearNotifications,
  createNotification,
  getNotifications,
  isValidNotificationClientId,
  markNotificationSeen,
} from '../server/notification-store.js'

export default async function handler(req, res) {
  const clientId = ['POST', 'PATCH'].includes(req.method)
    ? req.body?.clientId
    : req.query?.clientId
  if (!isValidNotificationClientId(clientId)) {
    return res.status(400).json({ error: 'Invalid notification client ID' })
  }

  try {
    if (req.method === 'GET') {
      const notifications = await getNotifications(clientId)
      return res.status(200).json({ notifications })
    }

    if (req.method === 'POST') {
      const { shipName, imo, flag } = req.body || {}
      if (![shipName, imo, flag].every((value) =>
        typeof value === 'string' && value.trim().length > 0 && value.length <= 200
      )) {
        return res.status(400).json({ error: 'Invalid notification details' })
      }

      const notification = await createNotification({
        clientId,
        shipName: shipName.trim(),
        imo: imo.trim(),
        flag: flag.trim(),
      })
      return res.status(201).json({ notification })
    }

    if (req.method === 'PATCH') {
      const { notificationId } = req.body || {}
      if (typeof notificationId !== 'string' || notificationId.length > 40) {
        return res.status(400).json({ error: 'Invalid notification details' })
      }
      const seen = await markNotificationSeen(clientId, notificationId)
      if (!seen) return res.status(404).json({ error: 'Notification not found' })
      return res.status(200).json({ ok: true })
    }

    if (req.method === 'DELETE') {
      await clearNotifications(clientId)
      return res.status(200).json({ ok: true })
    }

    res.setHeader('Allow', 'GET, POST, PATCH, DELETE')
    return res.status(405).json({ error: 'Method Not Allowed' })
  } catch (error) {
    console.error('[notifications api]', error)
    return res.status(503).json({ error: 'Notifications are temporarily unavailable' })
  }
}
