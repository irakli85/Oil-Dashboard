import { getAdminAuthHeaders } from './adminAuth'

const BASE_URL = '/api/invoices'

async function request(path, options = {}) {
  let response
  const { headers: requestHeaders, ...fetchOptions } = options
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...getAdminAuthHeaders(),
        ...requestHeaders,
      },
    })
  } catch {
    throw new Error('სერვერთან კავშირი ვერ დამყარდა')
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data?.error || 'მოთხოვნა ვერ შესრულდა')
  return data
}

export async function fetchVessels() {
  const data = await request('/vessels')
  return data.vessels || []
}

export async function createVessel(vessel) {
  const data = await request('/vessels', {
    method: 'POST',
    body: JSON.stringify(vessel),
  })
  return data.vessel
}

export async function deleteVessel(vesselId) {
  return request(`/vessels/${vesselId}`, { method: 'DELETE' })
}

export async function createInvoice(vesselId, invoice) {
  const data = await request(`/vessels/${vesselId}/invoices`, {
    method: 'POST',
    body: JSON.stringify(invoice),
  })
  return data.invoice
}

export async function deleteInvoice(invoiceId) {
  return request(`/invoices/${invoiceId}`, { method: 'DELETE' })
}

export async function createClearance(invoiceId, clearance) {
  const data = await request(`/invoices/${invoiceId}/clearances`, {
    method: 'POST',
    body: JSON.stringify(clearance),
  })
  return data.clearance
}

export async function deleteClearance(clearanceId) {
  return request(`/clearances/${clearanceId}`, { method: 'DELETE' })
}