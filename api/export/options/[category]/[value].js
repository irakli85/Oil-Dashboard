import { removeOption } from '../../server/export-routes.js'

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE')
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  const { category, value } = req.query
  return removeOption(req, res, category, value)
}
