import { invoiceDb } from './invoice-db.js'

function sendJson(res, status, payload) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(status).json(payload)
    return
  }
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  let raw = ''
  for await (const chunk of req) raw += chunk
  try {
    return raw ? JSON.parse(raw) : {}
  } catch {
    const error = new Error('არასწორი JSON მონაცემები')
    error.code = 'INVALID_INPUT'
    throw error
  }
}

function handleError(res, error) {
  if (error?.code === 'NOT_FOUND') {
    sendJson(res, 404, { error: error.message })
    return
  }
  if (error?.code === 'INVALID_INPUT' || error?.code === 'QUANTITY_EXCEEDED') {
    sendJson(res, 400, { error: error.message })
    return
  }
  if (error?.code === 'DATABASE_NOT_CONFIGURED') {
    sendJson(res, 503, { error: 'მონაცემთა ბაზა არ არის კონფიგურირებული' })
    return
  }
  const connectionCodes = ['ETIMEDOUT', 'ECONNREFUSED', 'ECONNRESET', 'ENOTFOUND', 'EHOSTUNREACH']
  const connectionFailure = (current) => current && (
    connectionCodes.includes(current.code) ||
    /connection terminated due to connection timeout|connection timeout/i.test(current.message || '') ||
    (Array.isArray(current.errors) && current.errors.some(connectionFailure)) ||
    connectionFailure(current.cause)
  )
  if (connectionFailure(error)) {
    sendJson(res, 503, { error: 'Neon-თან კავშირი ვერ დამყარდა. შეამოწმეთ IP Allowlist და outbound TCP 5432 დაშვება.' })
    return
  }
  if (error?.code === '23505') {
    sendJson(res, 409, { error: 'ამ გემზე ასეთი ინვოისის ნომერი უკვე არსებობს' })
    return
  }
  console.error('[invoice api]', error)
  sendJson(res, 500, { error: 'სერვერის შეცდომა' })
}

export default async function invoiceRoutes(req, res) {
  try {
    const pathname = new URL(req.originalUrl || req.url, 'http://localhost').pathname
    const route = pathname.replace(/^\/api\/invoices(?=\/|$)/, '') || '/'

    if (req.method === 'GET' && route === '/vessels') {
      sendJson(res, 200, { vessels: await invoiceDb.getVessels() })
      return
    }

    if (req.method === 'POST' && route === '/vessels') {
      const vessel = await invoiceDb.createVessel(await readBody(req))
      sendJson(res, 201, { vessel })
      return
    }

    const invoiceCreate = route.match(/^\/vessels\/(\d+)\/invoices$/)
    if (req.method === 'POST' && invoiceCreate) {
      const invoice = await invoiceDb.createInvoice(invoiceCreate[1], await readBody(req))
      sendJson(res, 201, { invoice })
      return
    }

    const invoiceDelete = route.match(/^\/invoices\/(\d+)$/)
    if (req.method === 'DELETE' && invoiceDelete) {
      await invoiceDb.deleteInvoice(invoiceDelete[1])
      sendJson(res, 200, { deleted: true })
      return
    }

    const clearanceCreate = route.match(/^\/invoices\/(\d+)\/clearances$/)
    if (req.method === 'POST' && clearanceCreate) {
      const clearance = await invoiceDb.createClearance(clearanceCreate[1], await readBody(req))
      sendJson(res, 201, { clearance })
      return
    }

    const clearanceDelete = route.match(/^\/clearances\/(\d+)$/)
    if (req.method === 'DELETE' && clearanceDelete) {
      await invoiceDb.deleteClearance(clearanceDelete[1])
      sendJson(res, 200, { deleted: true })
      return
    }

    sendJson(res, 404, { error: 'მოთხოვნილი მისამართი ვერ მოიძებნა' })
  } catch (error) {
    handleError(res, error)
  }
}