const BASE_URL = '/api/export'

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      ...options,
    })
  } catch {
    throw new Error('network')
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(data?.error || 'request_failed')
    error.serverMessage = data?.error
    throw error
  }

  return data
}

export async function fetchExportItems() {
  const data = await request('/items')
  return data.items || []
}

export async function createExportItem(item) {
  const data = await request('/items', {
    method: 'POST',
    body: JSON.stringify(item),
  })
  return data.item
}

export async function updateExportItem(id, patch) {
  const data = await request(`/items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  })
  return data.item
}

export async function fetchExportOptions() {
  const data = await request('/options')
  return data.options || { exporters: [], declarants: [], goods: [] }
}

export async function addExportOption(category, value) {
  const data = await request('/options', {
    method: 'POST',
    body: JSON.stringify({ category, value }),
  })
  return data.list || []
}

export async function removeExportOption(category, value) {
  const data = await request(`/options/${category}/${encodeURIComponent(value)}`, {
    method: 'DELETE',
  })
  return data.list || []
}
