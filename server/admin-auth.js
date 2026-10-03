import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

const SESSION_TTL_SECONDS = 12 * 60 * 60
const LOGIN_WINDOW_MS = 15 * 60 * 1000
const MAX_LOGIN_FAILURES = 5
const loginFailures = new Map()

function sendJson(res, status, payload) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(status).json(payload)
    return
  }
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error('ADMIN_SESSION_SECRET must contain at least 32 bytes')
  }
  return secret
}

function safeEqual(left, right) {
  const leftHash = createHash('sha256').update(String(left)).digest()
  const rightHash = createHash('sha256').update(String(right)).digest()
  return timingSafeEqual(leftHash, rightHash)
}

function signPayload(payload) {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = createHmac('sha256', getSessionSecret()).update(encodedPayload).digest('base64url')
  return `${encodedPayload}.${signature}`
}

export function verifyAdminToken(token) {
  if (typeof token !== 'string') return null
  const [encodedPayload, signature, extra] = token.split('.')
  if (!encodedPayload || !signature || extra) return null

  try {
    const expectedSignature = createHmac('sha256', getSessionSecret()).update(encodedPayload).digest()
    const suppliedSignature = Buffer.from(signature, 'base64url')
    if (suppliedSignature.length !== expectedSignature.length || !timingSafeEqual(suppliedSignature, expectedSignature)) {
      return null
    }

    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'))
    if (payload.role !== 'admin' || !payload.sub || !Number.isFinite(payload.exp) || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null
    }
    return payload
  } catch {
    return null
  }
}

function readAdminToken(req) {
  const authorization = req.headers?.authorization || req.headers?.Authorization || ''
  const match = String(authorization).match(/^Bearer\s+(.+)$/i)
  return match?.[1] || ''
}

export function requireAdmin(req, res) {
  const admin = verifyAdminToken(readAdminToken(req))
  if (!admin) {
    sendJson(res, 401, { error: 'ავტორიზაცია საჭიროა' })
    return false
  }
  req.admin = admin
  return true
}

function getClientKey(req) {
  const forwardedFor = req.headers?.['x-forwarded-for']
  if (forwardedFor) return String(forwardedFor).split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

export async function loginAdmin(req, res) {
  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!username || !password || !secret || Buffer.byteLength(secret) < 32) {
    return sendJson(res, 503, { error: 'ადმინისტრატორის ავტორიზაცია კონფიგურირებული არ არის' })
  }

  const now = Date.now()
  for (const [key, record] of loginFailures) {
    if (record.resetAt <= now) loginFailures.delete(key)
  }
  const clientKey = getClientKey(req)
  const current = loginFailures.get(clientKey)
  if (current && current.resetAt > now && current.count >= MAX_LOGIN_FAILURES) {
    return sendJson(res, 429, { error: 'ძალიან ბევრი მცდელობა. სცადეთ მოგვიანებით.' })
  }

  const body = req.body || {}
  const validCredentials = safeEqual(body.username || '', username) && safeEqual(body.password || '', password)
  if (!validCredentials) {
    const next = current && current.resetAt > now ? current : { count: 0, resetAt: now + LOGIN_WINDOW_MS }
    next.count += 1
    loginFailures.set(clientKey, next)
    return sendJson(res, 401, { error: 'მომხმარებელი ან პაროლი არასწორია' })
  }

  loginFailures.delete(clientKey)
  try {
    const expiresAt = Math.floor(now / 1000) + SESSION_TTL_SECONDS
    const token = signPayload({ sub: username, role: 'admin', exp: expiresAt })
    return sendJson(res, 200, { token, username, expiresAt })
  } catch (error) {
    console.error('[admin auth]', error)
    return sendJson(res, 503, { error: 'ადმინისტრატორის ავტორიზაცია კონფიგურირებული არ არის' })
  }
}

export function getAdminSession(req, res) {
  if (!requireAdmin(req, res)) return
  return sendJson(res, 200, {
    authenticated: true,
    username: req.admin.sub,
    expiresAt: req.admin.exp,
  })
}