# Wallpapers — Ryyan Safar

**COLLECTION_003 · UNHINGED_GALLERY**

A horizontal-scrolling wallpaper gallery with a deliberately unhinged, acid-green & obsidian aesthetic. Built on Next.js 16 App Router with Tailwind CSS v4, Lenis smooth scroll, and Firebase Firestore for real-time global like counts.

Live at **[wallpapers.ryyansafar.site](https://wallpapers.ryyansafar.site)**

---

## What's in here

| Section | Description |
|---------|-------------|
| **Hero** | Full-viewport title card with glitch text and collection badge |
| **Mobile Wallpapers Gallery** | Three 9:16 portrait wallpapers — locked screen, unlock screen, vibe card |
| **Desktop Main Wallpaper** | Full 16:9 desktop/widescreen wallpaper |
| **Ultra-Wide Screensaver** | Landscape screensaver, built for ultrawide monitors |
| **Outro** | "Stay Unhinged" sign-off with nav links |

Every wallpaper card has:
- **Global like count** — real-time across all visitors via Firestore
- **Like toggle** — click to like, click again to un-like; state persisted in localStorage per device
- **Download** — direct file download, no redirect

---

## Tech stack

| Tool | Version | Role |
|------|---------|------|
| Next.js | 16.2.1 | App Router, SSR/SSG, file serving |
| React | 19 | UI |
| Tailwind CSS | v4 | CSS-first config via `@theme`, utility classes |
| Lenis | 1.3.x | Smooth horizontal scroll (desktop only) |
| Firebase | 10.x | Firestore — real-time like counts |
| TypeScript | 5 | Type safety throughout |
| Vercel | — | Deployment & CDN |

---

## Quick start

```bash
git clone https://github.com/ryyansafar/wallpapers-ryyansafar.git
cd wallpapers-ryyansafar
npm install
```

You need a Firebase project with Firestore enabled. See [documentation/firebase.md](documentation/firebase.md) for the full setup guide.

Once Firebase is configured, run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Documentation

| Doc | Contents |
|-----|---------|
| [Getting Started](documentation/getting-started.md) | Prerequisites, clone, Firebase wiring, local dev |
| [Architecture](documentation/architecture.md) | Project structure, scroll system, responsive strategy, data flow |
| [Design System](documentation/design-system.md) | Color tokens, typography, the unhinged aesthetic, Tailwind v4 setup |
| [Components](documentation/components.md) | HorizontalScroller, WallpaperActions, useLikes — props, internals, extension |
| [Firebase Setup](documentation/firebase.md) | Firestore schema, security rules, config, what NOT to commit |
| [Deployment](documentation/deployment.md) | Vercel setup, environment variables, domain, CI/CD |

---

## Adding a new wallpaper

1. Drop the image into `/public/` (e.g. `w-newone.png`)
2. Add a desktop section in the `HorizontalScroller` block in `app/page.tsx` — follow the pattern of existing cards
3. Add a mobile card in the `md:hidden` block in `app/page.tsx`
4. Pass a unique `wallpaperId` string to `<WallpaperActions>` — Firestore creates the document automatically on first like

See [documentation/components.md](documentation/components.md) for the full `WallpaperActions` API.

---

## Security notes

- **Never commit** `*firebase-adminsdk*.json` — it contains a private key. It is gitignored.
- The Firebase **client config** (apiKey, projectId, etc.) in `app/lib/firebase.ts` is safe to be public — it is not a secret. Firebase security rules control access, not the config values.
- `.claude/` is gitignored — contains local editor settings.

---

## License

Personal project by [Ryyan Safar](https://ryyansafar.site). Wallpaper assets are original work — do not redistribute.
