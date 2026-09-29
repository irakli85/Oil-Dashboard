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
(injected by the Neon integration).

### Production AIS proxy (Render)

Vercel Functions are not a reliable home for the long-lived AIS WebSocket.
Deploy the persistent proxy as a Render web service:

1. In Render, create a new Blueprint from this repository. Render will use
   `render.yaml` and start `npm run start:ais`.
2. Wait for the health check at `/api/ais/health` to report `status: ok`.
3. Add the Render service URL as the Vercel production environment variable:

```
VITE_AIS_API_URL=https://oil-dashboard-ais.onrender.com
```

4. Redeploy the Vercel frontend after adding the variable.

The local frontend keeps using the Vite proxy when `VITE_AIS_API_URL` is not
set. The Render free plan may sleep when idle; use an always-on plan for a
continuous AIS feed.

### Vessel registry in Neon

The AIS proxy stores vessel metadata in the `vessel_registry` table. Add the
same Neon pooled connection string to the Render service environment:

```
POSTGRES_URL=<Neon pooled connection string>
```

The table is created automatically on the first AIS metadata event. Records
are keyed by MMSI and keep the first known IMO, vessel type, and name when a
later AIS position report omits those fields.
