# Oil Dashboard — Backend Setup

## Local development

```bash
npm install
npm run dev
```

This starts both the Vite frontend and the API server (port 3001) together.
The frontend proxies `/api/*` to the local server (see `vite.config.js`).

### Chatbot

The dashboard chatbot uses Google's Gemini 3.5 Flash-Lite model to answer
questions about the terminal and the dashboard. Add a Gemini API key as the
server-only `GOOGLE_GENERATIVE_AI_API_KEY` environment variable:

- For local development, add it to the gitignored project-root `.env.local`.
- For deployment, add it to the Vercel Production and Preview environment
  variables, then redeploy.

Create or rotate keys in [Google AI Studio](https://aistudio.google.com/app/apikey).
Never add the key to a `VITE_` variable, frontend code, or source control. The
model is available on Google's free tier subject to quotas; Google may use free
tier API content to improve its products. See the
[Gemini API pricing and terms](https://ai.google.dev/gemini-api/docs/pricing).
If a key has been shared in chat or another public place, revoke it and create
a replacement before configuring the chatbot.

### Database (optional locally)

Without a database the export module uses an in-memory store (data resets on restart); persistent vessel notifications require a PostgreSQL connection.

For a persistent local database, create `.env` in the project root:

```
DATABASE_URL=postgres://user:password@localhost:5432/oil_dashboard
```

Tables (`export_items`, `export_options`, and the AIS proximity notification
tables) are created automatically when first needed.
AIS arrival and departure events are recorded once when a vessel crosses the
2 km boundary, with the AIS position observation timestamp. Notifications
remain available after refresh, can be marked as seen individually, and show
an unread count in the notification bell.

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
2. Add `AISSTREAM_API_KEY` to the Render service's environment variables using
   an active key from AISstream.
3. For local development, add `AISSTREAM_API_KEY=<your AISstream API key>` to
   the gitignored project-root `.env.local` file.
4. If deploying the Vercel Function at `api/ais/batumi.js`, also set
   `AISSTREAM_API_KEY` in the Vercel Production and Preview environments.
5. Wait for the Render health check at `/api/ais/health` to report `status: ok`.
6. Add the Render service URL as the Vercel production environment variable:

```
VITE_AIS_API_URL=https://oil-dashboard-ais.onrender.com
```

7. Redeploy the Vercel frontend after adding the variable.

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

The proxy also maintains a `latest_vessel_positions` snapshot in Neon. It is
updated in batches while AIS data changes and restored when the Render service
starts, so a process restart does not leave the live map waiting for every ship
to report again. This stores only the latest position per MMSI, not a position
history.

### Admin authorization for deletions

Deletion controls in the live vessel list, export settings, and invoice
management require an admin login. There is no public signup. Configure these
server-only variables in Vercel for the production and preview environments:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<strong admin password>
ADMIN_SESSION_SECRET=<random secret of at least 32 bytes>
```

Set the same `ADMIN_SESSION_SECRET` on the Render `oil-dashboard-ais` service so
it can verify admin sessions for vessel dismissals. For local `npm run dev`,
put all three values in the gitignored project-root `.env` file. Never prefix
these variables with `VITE_` or commit their values. After changing variables,
redeploy Vercel and restart/redeploy Render. Admin sessions expire after 12
hours.
