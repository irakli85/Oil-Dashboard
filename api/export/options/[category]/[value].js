import { db } from '../../_db.js'

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { category, value } = req.query

    const list = await db.removeOption(category, decodeURIComponent(value || ''))
    return res.status(200).json({ category, list })
  } catch (error) {
    if (error?.code === 'INVALID_CATEGORY') {
      return res.status(400).json({ error: 'უცნობი კატეგორია' })
    }
    console.error('[export option delete]', error)
    return res.status(500).json({ error: 'სერვერის შეცდომა' })
  }
}
