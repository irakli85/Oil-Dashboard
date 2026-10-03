import React, { createContext, useContext, useEffect, useState } from 'react'
import { clearAdminToken, getAdminToken, setAdminToken } from '../services/adminAuth'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [authReady, setAuthReady] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [expiresAt, setExpiresAt] = useState(0)

  const logout = () => {
    clearAdminToken()
    setIsAuthenticated(false)
    setUsername('')
    setExpiresAt(0)
  }

  useEffect(() => {
    let active = true
    const token = getAdminToken()

    if (!token) {
      setAuthReady(true)
      return () => { active = false }
    }

    fetch('/api/auth/session', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}))
        if (!response.ok) throw new Error('session_expired')
        if (active) {
          setIsAuthenticated(true)
          setUsername(data.username || 'admin')
          setExpiresAt(Number(data.expiresAt) || 0)
        }
      })
      .catch(() => {
        clearAdminToken()
      })
      .finally(() => {
        if (active) setAuthReady(true)
      })

    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!isAuthenticated || !expiresAt) return undefined
    const timeout = window.setTimeout(logout, Math.max(0, expiresAt * 1000 - Date.now()))
    return () => window.clearTimeout(timeout)
  }, [isAuthenticated, expiresAt])

  const login = async (adminUsername, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ username: adminUsername, password }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(data.error || 'ავტორიზაცია ვერ მოხერხდა')

    setAdminToken(data.token)
    setIsAuthenticated(true)
    setUsername(data.username || adminUsername)
    setExpiresAt(Number(data.expiresAt) || 0)
  }

  return (
    <AdminAuthContext.Provider value={{ authReady, isAuthenticated, username, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) throw new Error('useAdminAuth must be used inside AdminAuthProvider')
  return context
}