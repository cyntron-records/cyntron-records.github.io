# Cyntron Records

The label site, artist pages, demo submissions and A&R dashboard in one repo. It is a Vite + React app that deploys to GitHub Pages as a static site.

## Edit the content

Everything public lives in `src/data.ts`: label copy, stats, artists and releases. To add an artist, add an entry to `ARTISTS`. Their page appears at `#/artists/<id>` automatically.

Artist photos go in `public/artists/` and are referenced from `data.ts`. The original standalone artist pages are kept in `public/legacy/` for reference. The old URLs (`/d4ntrix/`, `/softmap/`, ...) redirect to the new artist pages.

## Architecture

- **Frontend:** this Vite app on GitHub Pages.
- **API:** `server.ts` (Express) on Render.
- **Database:** Neon Postgres. Tables `users` and `demos` are created automatically on first start.
- **AI:** admins can run a Gemini review on any demo (`POST /api/demos/:id/ai-analyze`). It uses the Interactions API with `thinking_level: medium`.

## Set up accounts (one time)

1. **Neon:** create a project, then copy the pooled connection string (Dashboard > Connect). That is `DATABASE_URL`.
2. **Render:** New > Blueprint, pick this repo (it reads `render.yaml`). Set `DATABASE_URL` and `GEMINI_API_KEY` when prompted. `JWT_SECRET` is generated for you. Note the service URL, e.g. `https://cyntron-api.onrender.com`.
3. **GitHub:** repo Settings > Secrets and variables > Actions > Variables, add `VITE_API_URL` = your Render URL (no trailing slash). Push to `main` to redeploy the site.
4. **Make yourself admin:** register on the live site, then in the Neon SQL editor run:
   ```sql
   UPDATE users SET role = 'admin' WHERE lower(email) = 'you@example.com';
   ```
   Sign out and back in. The **A&R Admin** tab appears.

There is deliberately no way to become admin from the site itself.

## Run locally

```bash
cp .env.example .env     # fill in DATABASE_URL, JWT_SECRET, GEMINI_API_KEY
npm install
npm run server           # API on :3000
npm run dev              # site on :5173
```

## Notes

- Render's free plan sleeps when idle, so the first request after a pause can take about 30 seconds.
- Demos are submitted as links (SoundCloud, Drive, Dropbox). Render's disk is wiped on every deploy, so file uploads were removed.
- Passwords are hashed with bcrypt, sessions are 7-day signed tokens, and login/register are rate limited.
