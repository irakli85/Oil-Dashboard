import { db } from './_db.js'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const items = await db.getItems()
      return res.status(200).json({ items })
    }

    if (req.method === 'POST') {
      const body = req.body || {}
      const item = await db.createItem({
        exporter: body.exporter ?? '',
        declarant: body.declarant ?? '',
        goods: body.goods ?? '',
        code: body.code || 'C-000000',
        regDate: body.regDate || '-',
        declarationNum: body.declarationNum || '-',
        days: body.days || 0,
        expDate: body.expDate || '-',
        weight: body.weight || '0.00',
        status: 'active',
        shipName: '',
        departureDate: '',
        note: body.note || '-',
      })
      return res.status(201).json({ item })
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  } catch (error) {
    console.error('[export items]', error)
    return res.status(500).json({ error: 'სერვერის შეცდომა' })
  }
}
