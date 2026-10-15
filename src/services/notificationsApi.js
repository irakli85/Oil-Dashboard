const CLIENT_ID_KEY = 'oil-dashboard-notification-client-id'

export function getNotificationClientId() {
  let clientId = window.localStorage.getItem(CLIENT_ID_KEY)
  if (!clientId) {
    clientId = window.crypto.randomUUID()
    window.localStorage.setItem(CLIENT_ID_KEY, clientId)
  }
  return clientId
}

async function request(url, options) {
  let response
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })
  } catch {
    throw new Error('network')
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data?.error || 'request_failed')
  return data
}

export async function fetchNotifications(clientId) {
  const query = new URLSearchParams({ clientId })
  const data = await request(`/api/notifications?${query}`)
  return data.notifications
}

export async function markNotificationSeen(clientId, notificationId) {
  await request('/api/notifications', {
    method: 'PATCH',
    body: JSON.stringify({ clientId, notificationId }),
  })
}

export async function deleteNotifications(clientId) {
  const query = new URLSearchParams({ clientId })
  await request(`/api/notifications?${query}`, { method: 'DELETE' })
}
