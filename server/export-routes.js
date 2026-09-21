import { getExportStore } from './export-store.js'

const CATEGORY_LABELS = {
  exporters: 'ექსპორტიორი',
  declarants: 'დეკლარანტი',
  goods: 'საქონლის დასახელება',
}

export function parseBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') {
      resolve(req.body)
      return
    }
    let raw = ''
    req.on('data', (chunk) => {
      raw += chunk
    })
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new Error('invalid_json'))
      }
    })
    req.on('error', reject)
  })
}

function sendJson(res, status, payload) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(status).json(payload)
    return
  }
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

function handleError(res, error) {
  if (error?.code === 'INVALID_CATEGORY') {
    sendJson(res, 400, { error: 'უცნობი კატეგორია' })
    return
  }
  if (error?.code === 'EMPTY_VALUE') {
    sendJson(res, 400, { error: 'მნიშვნელობა ცარიელია' })
    return
  }
  console.error('[export api]', error)
  sendJson(res, 500, { error: 'სერვერის შეცდომა' })
}

export async function listItems(req, res) {
  try {
    const items = await getExportStore().getItems()
    sendJson(res, 200, { items })
  } catch (error) {
    handleError(res, error)
  }
}

export async function createItem(req, res) {
  try {
    const body = await parseBody(req)
    const item = await getExportStore().createItem({
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
    sendJson(res, 201, { item })
  } catch (error) {
    handleError(res, error)
  }
}

export async function updateItem(req, res, id) {
  try {
    const body = await parseBody(req)
    const patch = {}
    if (body.status === 'active' || body.status === 'archived') {
      patch.status = body.status
    }
    if (typeof body.shipName === 'string') {
      patch.shipName = body.shipName
    }
    if (typeof body.departureDate === 'string') {
      patch.departureDate = body.departureDate
    }

    const item = await getExportStore().updateItem(id, patch)
    if (!item) {
      sendJson(res, 404, { error: 'ჩანაწერი ვერ მოიძებნა' })
      return
    }
    sendJson(res, 200, { item })
  } catch (error) {
    handleError(res, error)
  }
}

export async function getOptions(req, res) {
  try {
    const options = await getExportStore().getOptions()
    sendJson(res, 200, { options })
  } catch (error) {
    handleError(res, error)
  }
}

export async function addOption(req, res) {
  try {
    const body = await parseBody(req)
    const list = await getExportStore().addOption(body.category, body.value)
    sendJson(res, 200, { category: body.category, list })
  } catch (error) {
    handleError(res, error)
  }
}

export async function removeOption(req, res, category, value) {
  try {
    const list = await getExportStore().removeOption(category, decodeURIComponent(value || ''))
    sendJson(res, 200, {
      category,
      label: CATEGORY_LABELS[category] || category,
      list,
    })
  } catch (error) {
    handleError(res, error)
  }
}
