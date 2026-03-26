# Architecture

A deep-dive into how the project is structured, how the scroll system works, and how the desktop and mobile experiences are delivered from a single codebase.

---

## Overview

The app is a **single-page application** built on Next.js 16 App Router. There is one route: `/` (`app/page.tsx`). The page contains two completely separate layouts that are toggled purely via CSS:

- **Desktop layout** (`hidden md:block`) — a horizontal-scrolling immersive gallery
- **Mobile layout** (`md:hidden`) — a vertical-scrolling card feed

Both layouts share the same wallpaper assets and `WallpaperActions` component (likes + download), but are rendered differently for their respective viewports.

---

## File structure

```
app/
├── components/
│   ├── HorizontalScroller.tsx     # Lenis wrapper for desktop scroll
│   └── WallpaperActions.tsx       # Like + Download buttons
├── hooks/
│   └── useLikes.ts                # Firestore like state hook
├── lib/
│   └── firebase.ts                # Firebase app + Firestore instance
├── globals.css                    # Global styles + Tailwind @theme tokens
├── layout.tsx                     # Root layout (fonts, metadata, body classes)
└── page.tsx                       # Main page (desktop + mobile)
```

---

## Rendering strategy

The app is a **Client Component** (`'use client'` at the top of `page.tsx`). This is because:

- `HorizontalScroller` uses `useRef` + `useEffect` for Lenis (requires DOM)
- `WallpaperActions` uses `useLikes` which subscribes to Firestore via `onSnapshot`
- Download logic requires `document.createElement('a')`

None of this can run on the server. Since the root page is a client component, Next.js renders a static HTML shell on the server and hydrates on the client.

> **Note:** For a gallery of this type, there's no meaningful SEO content that needs SSR — the page is a creative portfolio piece, not a content-indexed document. Client rendering is the right choice here.

---

## Scroll system

### Desktop: Lenis horizontal scroll

On desktop (`window.innerWidth >= 768`), the gallery is a horizontal scroll container managed by [Lenis](https://lenis.darkroom.engineering/).

**How it works:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  <main id="h-scroll"> (overflow: hidden, w-screen, h-screen)        │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  <div class="flex h-full w-fit">  (unbounded width)            │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │  │
│  │  │ HERO     │ │ GALLERY  │ │ MAIN WP  │ │ SCREEN-  │  ...     │  │
│  │  │ section  │ │ section  │ │ section  │ │ SAVER    │          │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │  │
│  └────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

- The `<main>` wrapper is `w-screen h-screen overflow-hidden`
- The inner `<div>` is `flex h-full w-fit` — it expands to fit all sections
- Lenis is initialized with `wrapper: el, content: el, orientation: 'horizontal'`
- `gestureOrientation: 'both'` means vertical trackpad/mouse wheel input translates to horizontal movement
- `document.body.style.overflow = 'hidden'` is set to prevent the browser's default scroll behaviour competing with Lenis
- A `requestAnimationFrame` loop calls `lenis.raf(time)` every frame
- `window.lenisHorizontal` is exposed so the HOME button in the Outro can call `lenisHorizontal.scrollTo(0)` to jump back to the start

**Why guard against mobile:**

```ts
// HorizontalScroller.tsx
useEffect(() => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) return;
  // ... Lenis init
}, []);
```

Even though `HorizontalScroller` is inside a `hidden md:block` CSS wrapper, React **still mounts and runs the useEffect** on mobile — CSS `display: none` does not prevent mounting. Without this guard, Lenis would run on mobile, set `body.overflow = hidden`, and completely break the mobile vertical scroll.

### Mobile: native scroll

On mobile (`md:hidden`), the layout is a plain vertical-scroll page. No Lenis, no JavaScript scroll management. The browser handles it natively.

`body { overflow-x: hidden }` from `globals.css` only prevents horizontal bleed — it does not affect vertical scroll.

---

## Responsive design strategy

The breakpoint is `md` = `768px`, the Tailwind default. Rather than a single layout that adapts, there are two parallel layouts:

```tsx
{/* Desktop: shown only at ≥768px */}
<div className="hidden md:block">
  <HorizontalScroller>
    {/* horizontal sections */}
  </HorizontalScroller>
</div>

{/* Mobile: shown only below 768px */}
<div className="md:hidden bg-surface min-h-screen">
  {/* vertical card feed */}
</div>
```

**Why two layouts instead of one responsive layout?**

The desktop experience is fundamentally horizontal — it requires fixed `h-screen` sections, `overflow: hidden` on the body, and a custom scroll engine. The mobile experience is fundamentally vertical — standard document flow, scrollable cards, portrait aspect ratios. Attempting to merge these into one layout with responsive classes would create a brittle mess. Two clean layouts is the right call.

Both layouts use the same `WallpaperActions` component — the `mobile` prop switches it between a flex-row two-button layout (mobile) and a stacked two-button layout (desktop cards).

---

## Data flow

```
Firebase Firestore
  └── Collection: likes
        ├── Document: w-locked       { count: N }
        ├── Document: w-unlocked     { count: N }
        ├── Document: w-yo           { count: N }
        ├── Document: w-mainwallpaper { count: N }
        └── Document: w-screensaver  { count: N }

useLikes(wallpaperId)
  ├── onSnapshot(doc)  →  setCount()  (real-time, all viewers see same count)
  ├── localStorage.getItem(`rs_liked_${id}`)  →  setIsLiked()  (per device)
  └── toggleLike()
        ├── getDoc() + updateDoc({ count: increment(±1) })
        └── localStorage.setItem / removeItem

WallpaperActions
  ├── reads: { count, isLiked, loading } from useLikes
  ├── renders: Like button (filled heart if liked, outline if not) + count badge
  └── renders: Download button (anchor tag with `download` attribute)
```

### User identity

There is no authentication. Each browser generates a random UUID on first interaction and stores it in `localStorage` as `rs_uid`. This is used only as a uniqueness check — it is never sent to Firebase. The like state is purely localStorage-local: if a user clears their storage or switches browsers, they start fresh.

The Firestore count is a bare integer — no user tracking server-side. This means the count is optimistic (a user could technically click Like from multiple devices and count twice) but for a personal gallery this is intentional — frictionless engagement over strict deduplication.

---

## Font loading

Fonts are loaded via `<link>` tags in `app/layout.tsx`, not via `next/font`. This is intentional for these font families:

- **Space Grotesk** (Google Fonts) — headlines
- **Epilogue** (Google Fonts) — body text
- **Barrio** (Google Fonts) — the "street art" display font
- **Council** (Google Fonts) — the monospace stamp font
- **Material Symbols Outlined** (Google Fonts) — icon font

`next/font` is primarily beneficial for fonts loaded from a URL at build time (it downloads and self-hosts them). Since this project targets a specific creative aesthetic that depends on these exact font families, and is deployed on Vercel with a global CDN that already serves these Google Fonts efficiently, the `<link>` approach is simpler and equivalent in performance.

---

## Build output

```
npm run build
```

Next.js 16 with Turbopack produces a standard `.next/` output. The app is deployed as a Node.js server on Vercel (not static export), which is required because Next.js App Router features need a runtime.

The `public/` directory is served as static assets directly from Vercel's edge CDN — wallpaper files are served at the edge, not through the Node.js runtime.
