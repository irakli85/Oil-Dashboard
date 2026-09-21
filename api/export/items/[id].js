import { updateItem } from '../../server/export-routes.js'

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', 'PATCH')
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  return updateItem(req, res, req.query.id)
}
