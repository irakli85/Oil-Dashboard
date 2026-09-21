import { db } from './_db.js'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const options = await db.getOptions()
      return res.status(200).json({ options })
    }

    if (req.method === 'POST') {
      const { category, value } = req.body || {}
      const list = await db.addOption(category, value)
      return res.status(200).json({ category, list })
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  } catch (error) {
    if (error?.code === 'INVALID_CATEGORY') {
      return res.status(400).json({ error: 'უცნობი კატეგორია' })
    }
    if (error?.code === 'EMPTY_VALUE') {
      return res.status(400).json({ error: 'მნიშვნელობა ცარიელია' })
    }
    console.error('[export options]', error)
    return res.status(500).json({ error: 'სერვერის შეცდომა' })
  }
}
