import { listItems, createItem } from '../server/export-routes.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return listItems(req, res)
  }
  if (req.method === 'POST') {
    return createItem(req, res)
  }
  res.setHeader('Allow', 'GET, POST')
  res.status(405).json({ error: 'Method Not Allowed' })
}
