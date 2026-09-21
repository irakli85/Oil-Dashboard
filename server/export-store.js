import { createMemoryStore } from './export-memory.js'
import { createPgStore } from './export-pg.js'

let store = null

export function getExportStore() {
  if (!store) {
    const connectionString =
      process.env.POSTGRES_URL ||
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.DATABASE_URL

    store = connectionString ? createPgStore(connectionString) : createMemoryStore()

    if (!connectionString) {
      console.warn(
        '[export] DATABASE_URL is not set — using in-memory store (data resets on restart)'
      )
    }
  }
  return store
}
