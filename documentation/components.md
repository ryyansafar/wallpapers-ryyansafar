# Components

Developer reference for every custom component and hook in the project.

---

## `HorizontalScroller`

**File:** `app/components/HorizontalScroller.tsx`
**Type:** Client Component

Wraps the desktop gallery in a Lenis-powered smooth horizontal scroll container.

### Props

```ts
interface Props {
  children: React.ReactNode;
}
```

### Behaviour

- Initializes a Lenis instance with `orientation: 'horizontal'` and `gestureOrientation: 'both'` (vertical input → horizontal movement)
- Runs a `requestAnimationFrame` loop for Lenis
- Sets `document.body.style.overflow = 'hidden'` to suppress native scroll
- Exposes the Lenis instance as `window.lenisHorizontal` for external programmatic navigation (the HOME button in the Outro uses this)
- **Mobile guard:** checks `window.innerWidth < 768` in the `useEffect` and returns early — prevents Lenis from running on mobile and blocking the vertical scroll layout
- Cleans up on unmount: destroys Lenis, restores `body.overflow`, removes `window.lenisHorizontal`

### Usage

```tsx
<HorizontalScroller>
  <section className="min-w-screen h-full flex-shrink-0 snap-start ...">
    {/* ... */}
  </section>
  <section className="min-w-screen h-full flex-shrink-0 snap-start ...">
    {/* ... */}
  </section>
</HorizontalScroller>
```

### Section requirements

Each direct child section should have:
- `min-w-screen` (or `min-w-[100vw]`) — ensures each section fills the viewport width
- `h-full` — fills the full scroll container height
- `flex-shrink-0` — prevents sections from collapsing in the flex container
- `snap-start` — for CSS scroll snapping (sections snap into place)

### Programmatic scroll

From anywhere:
```ts
(window as any).lenisHorizontal?.scrollTo(0, { lerp: 0.1 }); // scroll to start
(window as any).lenisHorizontal?.scrollTo(target, { lerp: 0.08 }); // scroll to px offset
```

---

## `WallpaperActions`

**File:** `app/components/WallpaperActions.tsx`
**Type:** Client Component

Renders the Like and Download buttons for a wallpaper card. Handles global like count via Firestore and file download.

### Props

```ts
interface Props {
  wallpaperId: string;    // Firestore document ID + localStorage key namespace
  src: string;            // Path to the asset, e.g. "/w-locked.png"
  filename: string;       // Suggested download filename, e.g. "wallpaper-locked-ryyan.png"
  mobile?: boolean;       // Default: false. Switches to mobile two-column layout
  likeRotate?: string;    // Tailwind rotation classes for the like button. Default: "rotate-2"
  downloadRotate?: string; // Tailwind rotation classes for the download button. Default: "-rotate-1 hover:rotate-1"
}
```

### Like button behaviour

- Shows a `favorite` icon (filled when liked, outlined when not)
- Displays the global like count if > 0 (updates in real-time via Firestore `onSnapshot`)
- On click: atomically increments or decrements the Firestore `likes/{wallpaperId}` document count, and toggles `localStorage.getItem('rs_liked_{wallpaperId}')`
- Disabled and dimmed while a Firestore write is in-flight (`loading` state)
- State flips immediately on click (optimistic via localStorage) — the Firestore update and `onSnapshot` confirm the new count within ~200ms

### Download behaviour

Creates a temporary anchor element with `href={src}` and `download={filename}`, appends it to the DOM, clicks it programmatically, then removes it. This triggers the browser's native file download for the asset at `src`.

Works for same-origin assets (PNG, SVG, etc.) served from the Next.js `public/` directory. For cross-origin assets you would need to fetch + blob instead.

### Layout variants

**Desktop (`mobile={false}`, default):**
```
┌─────────────────────────┐
│ ♥ LIKED  42             │  ← bg-surface, border-primary-fixed (when liked)
├─────────────────────────┤     OR bg-primary-fixed (when not liked)
│ ↓ DOWNLOAD              │  ← bg-surface, border-primary-fixed
└─────────────────────────┘
```
Stacked vertically (flex-col), designed to sit in the bottom-left of a portrait wallpaper card.

**Mobile (`mobile={true}`):**
```
┌─────────────────────┬───────────────────────┐
│ ♥ LIKED  42         │  ↓ DOWNLOAD            │
└─────────────────────┴───────────────────────┘
```
Side-by-side (flex-row), each button `flex-1`, full width of the card.

### Usage examples

Desktop card (inside a fixed-size div):
```tsx
<div className="absolute bottom-6 left-6">
  <WallpaperActions
    wallpaperId="w-locked"
    src="/w-locked.png"
    filename="wallpaper-locked-ryyan.png"
    likeRotate="rotate-2"
    downloadRotate="-rotate-1 hover:rotate-1"
  />
</div>
```

Mobile card (below the image):
```tsx
<WallpaperActions
  wallpaperId="w-locked"
  src="/w-locked.png"
  filename="wallpaper-locked-ryyan.png"
  mobile
/>
```

### Adding a new wallpaper

1. Pick a unique `wallpaperId` string (e.g. `"w-newwallpaper"`) — this becomes the Firestore document ID
2. Add the asset to `public/` (e.g. `w-newwallpaper.png`)
3. Use `<WallpaperActions wallpaperId="w-newwallpaper" src="/w-newwallpaper.png" filename="..." />`
4. Firestore creates `likes/w-newwallpaper` automatically on the first like — no manual setup needed

---

## `useLikes` hook

**File:** `app/hooks/useLikes.ts`
**Type:** Client-only hook (uses `localStorage` and Firebase)

### Signature

```ts
function useLikes(wallpaperId: string): {
  count: number;        // Global like count from Firestore (live)
  isLiked: boolean;     // Whether this device has liked it (from localStorage)
  toggleLike: () => Promise<void>;  // Toggle like on/off
  loading: boolean;     // True while a Firestore write is in-flight
}
```

### Internals

**Initialization (useEffect on mount):**
1. Reads `localStorage.getItem('rs_liked_{wallpaperId}')` — sets `isLiked` state
2. Opens a Firestore `onSnapshot` listener on `doc(db, 'likes', wallpaperId)` — sets `count` state reactively
3. Returns the unsubscribe function for cleanup on unmount

**`toggleLike`:**
1. Sets `loading = true`
2. Calls `getDoc(ref)` to check if the document exists
3. If it exists: calls `updateDoc(ref, { count: increment(±1) })`
4. If it doesn't exist (first ever like on this wallpaper): calls `setDoc(ref, { count: 1 })`
5. Updates localStorage
6. Sets `isLiked` to new state
7. Sets `loading = false`

The `onSnapshot` listener picks up the Firestore write and updates `count` automatically — no manual `setCount()` is needed after the write.

### User ID

```ts
function getUserId(): string {
  let uid = localStorage.getItem('rs_uid');
  if (!uid) {
    uid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('rs_uid', uid);
  }
  return uid;
}
```

A random alphanumeric string, generated once and stored in `localStorage` as `rs_uid`. Currently used only as a namespacing reference (the UID itself is not sent to Firestore in this implementation). The like state is tracked purely per localStorage key per wallpaper.

---

## `app/lib/firebase.ts`

Exports the initialized Firestore `db` instance.

```ts
import { db } from '../lib/firebase';
```

Uses the `getApps().length === 0` pattern to avoid re-initializing Firebase during Next.js hot reloads in development.

Only imports `getFirestore` — no Analytics, no Auth, no Storage. Keeps the Firebase client bundle minimal.

---

## Page structure (`app/page.tsx`)

Not a reusable component, but worth documenting for contributors.

The page is a single `'use client'` component containing two parallel layouts:

```tsx
export default function Home() {
  return (
    <>
      {/* ─── DESKTOP ─── (hidden on mobile) */}
      <div className="hidden md:block">
        <HorizontalScroller>
          {/* Hero section */}
          {/* Gallery section (3 portrait wallpapers) */}
          {/* Desktop Main Wallpaper section */}
          {/* Screensaver section */}
          {/* Outro section */}
        </HorizontalScroller>
        {/* Fixed floating brand badge */}
      </div>

      {/* ─── MOBILE ─── (hidden on desktop) */}
      <div className="md:hidden bg-surface min-h-screen">
        {/* Sticky header */}
        {/* Hero */}
        {/* 5 wallpaper cards: locked, unlocked, yo, mainwallpaper, screensaver */}
        {/* Footer */}
      </div>
    </>
  );
}
```

Desktop sections scroll horizontally inside `HorizontalScroller`. Mobile cards stack vertically inside the `md:hidden` div. Both use `<WallpaperActions>` with the same `wallpaperId` strings so likes are shared between mobile and desktop views.
