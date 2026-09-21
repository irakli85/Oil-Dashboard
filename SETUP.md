# Oil Dashboard — Backend Setup

## Local development

```bash
npm install
npm run dev
```

This starts both the Vite frontend and the API server (port 3001) together.
The frontend proxies `/api/*` to the local server (see `vite.config.js`).

### Database (optional locally)

Without a database the export module uses an in-memory store (data resets on restart).

For a persistent local database, create `.env` in the project root:

```
DATABASE_URL=postgres://user:password@localhost:5432/oil_dashboard
```

Tables (`export_items`, `export_options`) are created and seeded automatically on first request.

## Production (Vercel)

1. Push the repo and import it into Vercel (or run `vercel link`).
2. Install a Postgres integration from the Vercel Marketplace (e.g. **Neon**):
   ```bash
   vercel integration add neon
   ```
   or via the dashboard: Storage → Create Database → Postgres (Neon).
3. Pull env vars for local use with the real database:
   ```bash
   vercel env pull .env
   ```
4. Deploy:
   ```bash
   vercel --prod
   ```

The export API lives in `api/export/` (Vercel Functions) and uses `POSTGRES_URL`
(injected by the Neon integration). The AIS proxy routes (`/api/ais/*`) are
local-dev only, served by `server/ais-proxy.js`.
