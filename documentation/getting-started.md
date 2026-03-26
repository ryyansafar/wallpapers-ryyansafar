# Getting Started

This guide takes you from zero to a running local dev environment.

---

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | 20+ | `node -v` to check |
| npm | 10+ | Ships with Node 20 |
| Git | any | For cloning |
| A Firebase account | — | Free Spark plan is enough |
| A modern browser | — | Chrome, Firefox, Safari, Edge |

---

## 1. Clone and install

```bash
git clone https://github.com/ryyansafar/wallpapers-ryyansafar.git
cd wallpapers-ryyansafar
npm install
```

This installs all dependencies including Next.js, Tailwind CSS v4, Lenis, and the Firebase client SDK.

---

## 2. Firebase setup

The app uses Firebase Firestore to store global like counts. You need to wire it up before the like buttons work. Without Firebase, the rest of the site (gallery, download, scroll) works fine — but the like buttons will throw console errors.

**Full Firebase guide:** [firebase.md](firebase.md)

**Short version:**

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a project (or use an existing one)
3. Add a **Web app** to the project
4. Copy the config object it gives you
5. Open `app/lib/firebase.ts` and paste it in (replacing the placeholder values)
6. Enable **Firestore Database** in the Firebase console (Start in test mode initially)

The config file looks like this:

```ts
// app/lib/firebase.ts
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
};
```

These values are **not secrets** — they are safe to commit. Firebase security rules are what protect your data, not the config values.

---

## 3. Run the dev server

```bash
npm run dev
```

The app starts on [http://localhost:3000](http://localhost:3000) by default. If port 3000 is in use, Next.js will try 3001, 3002, etc. — check your terminal output.

The dev server uses **Turbopack** (Next.js 16 default) for fast hot reloads.

---

## 4. Project structure at a glance

```
wallpapers-ryyansafar/
├── app/
│   ├── components/
│   │   ├── HorizontalScroller.tsx   # Lenis smooth scroll wrapper (desktop)
│   │   └── WallpaperActions.tsx     # Like + Download buttons (desktop + mobile variants)
│   ├── hooks/
│   │   └── useLikes.ts              # Firebase Firestore like state + toggle
│   ├── lib/
│   │   └── firebase.ts              # Firebase app init + db export
│   ├── globals.css                  # Tailwind v4 @theme tokens + global styles
│   ├── layout.tsx                   # Root layout — fonts, metadata
│   └── page.tsx                     # Main page — desktop + mobile layouts
├── public/
│   ├── w-locked.png                 # Wallpaper: locked screen
│   ├── w-unlocked.png               # Wallpaper: unlock screen
│   ├── w-yo.png                     # Wallpaper: yo card
│   ├── w-mainwallpaper.svg          # Wallpaper: desktop main
│   ├── w-screensaver.png            # Wallpaper: ultrawide screensaver
│   ├── logo-header-fr.svg           # Header logo badge
│   ├── Logo-bg.svg                  # Outro background watermark
│   └── logo.png                     # Mobile footer watermark
├── documentation/                   # You are here
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 5. Add your own wallpapers

See the [Adding a new wallpaper](../README.md#adding-a-new-wallpaper) section in the root README, and [components.md](components.md) for the `WallpaperActions` API.

---

## 6. Build for production

```bash
npm run build
npm run start
```

Or deploy to Vercel — see [deployment.md](deployment.md).

---

## Common issues

### `FirebaseError: Missing or insufficient permissions`

Your Firestore security rules are blocking reads/writes. Go to Firebase Console → Firestore Database → Rules and either use test mode or set proper rules. See [firebase.md](firebase.md#security-rules).

### Fonts not loading locally

The app loads fonts from Google Fonts over a `<link>` tag. If you're offline or on a network that blocks Google CDN, fonts fall back to system sans-serif. This is expected.

### `min-w-screen` causing layout issues

This project uses Tailwind CSS v4. If you downgrade to v3, `min-w-screen` behaves differently. Stick with v4 (`tailwindcss@^4`).

### Mobile layout not scrolling

If you're testing mobile on desktop browser DevTools, make sure you refresh after toggling responsive mode — the Lenis initialization checks `window.innerWidth` at mount time, so it won't re-initialize mid-session. A full page refresh after switching to mobile viewport fixes this.
