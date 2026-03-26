# Deployment

This project is deployed on **Vercel**. This guide covers the deployment setup, environment variables, and how to update a live deployment.

---

## Vercel setup

### First-time deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import the `wallpapers-ryyansafar` repository
4. Vercel auto-detects Next.js — leave all build settings at their defaults:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
5. Click **Deploy**

Your site will be live at `your-project.vercel.app` within about a minute.

---

## Environment variables

If you moved your Firebase config out of `app/lib/firebase.ts` and into environment variables (see [firebase.md](firebase.md#deploying-firebase-config-to-vercel)), you need to add them to Vercel:

1. Go to your Vercel project dashboard
2. Click **Settings → Environment Variables**
3. Add each variable:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIza...` | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` | All |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `your-project` | All |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `your-project.firebasestorage.app` | All |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `123456...` | All |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:123456:web:abc123` | All |

4. After adding variables, **redeploy** the project (Vercel → Deployments → Redeploy) — environment variables only take effect on new builds.

> The `NEXT_PUBLIC_` prefix is required. Without it, Next.js will not include the value in the client bundle. These values are not secrets — they will be visible in your JavaScript bundle, which is expected and fine.

---

## Custom domain

1. In Vercel → your project → **Settings → Domains**
2. Click **Add Domain**
3. Enter your domain (e.g. `wallpapers.ryyansafar.site`)
4. Vercel gives you DNS records to add at your registrar:
   - For a subdomain: add a `CNAME` record pointing to `cname.vercel-dns.com`
   - For an apex domain: add `A` records pointing to Vercel's IPs
5. Once DNS propagates (usually within minutes on Cloudflare, up to 48h on some registrars), Vercel provisions a TLS certificate automatically

---

## Updating the live site

Any push to the `main` branch on GitHub automatically triggers a new Vercel deployment. The pipeline is:

```
git push origin main
    ↓
GitHub webhook → Vercel
    ↓
npm install + npm run build
    ↓
Deployed to production
```

Pushes to any other branch create **Preview Deployments** — isolated URLs for testing changes before merging to main.

---

## Build output

```bash
npm run build
```

Next.js 16 with Turbopack produces a hybrid output:
- **Server-rendered routes** — handled by Vercel's Node.js runtime (serverless functions)
- **Static assets** (`public/`) — served directly from Vercel's edge CDN, globally distributed

Since all wallpaper images are in `public/`, they are served at the edge — fast worldwide with no runtime overhead.

---

## Vercel project settings that matter

### Function region

By default, Vercel deploys serverless functions to the region closest to the developer. For a globally accessed site, consider setting the function region to match your primary audience, or use Vercel's **Edge Runtime** for truly global server-side execution.

For this project, server-side rendering is minimal (the page is mostly client-rendered), so region choice has little performance impact.

### Build caching

Vercel caches `node_modules` between builds. If you add or update npm packages, the cache is invalidated automatically. If you ever suspect a stale cache is causing issues, you can force a clean build from the Vercel dashboard: **Deployments → (latest) → Redeploy → Clear Build Cache**.

---

## Running production build locally

To test the production build before pushing:

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000). This runs the Next.js production server locally — same behaviour as Vercel, minus the CDN.

If you're using `.env.local` for Firebase config, make sure the file exists — `npm run start` reads it.

---

## What NOT to deploy

These are gitignored and should never reach your repo or Vercel:

| File/Dir | Reason |
|----------|--------|
| `*firebase-adminsdk*.json` | Contains a private RSA key — full admin access to Firebase |
| `.env.local` | Contains local environment overrides (though Firebase client config is not a secret, other things might be) |
| `.claude/` | Local Claude Code editor settings |
| `.next/` | Build output — Vercel builds this from source |
| `node_modules/` | Dependencies — Vercel installs from `package.json` |
