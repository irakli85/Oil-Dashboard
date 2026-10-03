const TOKEN_KEY = 'oil-dashboard-admin-session'

export function getAdminToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

export function setAdminToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export function clearAdminToken() {
  try {
    sessionStorage.removeItem(TOKEN_KEY)
  } catch {}
}

export function getAdminAuthHeaders() {
  const token = getAdminToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}