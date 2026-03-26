# Design System

The visual identity for this project is deliberately unhinged — think scrapbook meets brutalism meets acid techno flyer. This document covers the color system, typography, design tokens, and the principles behind the aesthetic.

---

## Design language

The gallery follows **Variant C: Acid Green & Obsidian** — a Material Design 3 dark color scheme with a twisted, lo-fi execution:

- **Obsidian base** — near-black surfaces (`#131313`), not pure black, to retain depth
- **Acid green accent** — `#c3f400` / `#abd600` for everything that demands attention
- **Rotated everything** — stickers, labels, and cards are slightly rotated for a "slapped on" feel
- **Stamp typography** — monospace labels feel like physical stamps on a wall
- **Glitch text** — `text-shadow` offset in green and magenta for a VHS glitch effect
- **Holographic overlay** — a subtle gradient shimmer on wallpaper cards

---

## Color tokens

Defined in `app/globals.css` inside the `@theme {}` block (Tailwind v4's CSS-first configuration):

```css
@theme {
  --color-surface:                   #131313;   /* Main background */
  --color-surface-dim:               #131313;
  --color-surface-bright:            #393939;
  --color-surface-container-lowest:  #0e0e0e;
  --color-surface-container-low:     #1c1b1b;   /* Gallery section background */
  --color-surface-container:         #201f1f;
  --color-surface-container-high:    #2a2a2a;   /* Card backgrounds */
  --color-surface-container-highest: #353534;   /* Outro background */
  --color-surface-variant:           #353534;
  --color-surface-tint:              #abd600;   /* Secondary accent (slightly dimmer green) */

  --color-on-surface:                #e5e2e1;   /* Primary text */
  --color-on-surface-variant:        #c4c9ac;   /* Secondary text */

  --color-primary:                   #ffffff;
  --color-primary-fixed:             #c3f400;   /* THE accent — acid green */
  --color-primary-fixed-dim:         #abd600;

  --color-secondary:                 #ffb2ba;   /* Pink accent (unused but available) */
  --color-secondary-container:       #d4004b;

  --color-outline:                   #8e9379;   /* Borders */
  --color-outline-variant:           #444933;   /* Subtle dividers */
}
```

### How to use colors in Tailwind v4

Because these are defined as CSS custom properties in `@theme`, Tailwind v4 generates utility classes for all of them automatically:

```
--color-primary-fixed  →  bg-primary-fixed, text-primary-fixed, border-primary-fixed
--color-surface        →  bg-surface, text-surface
--color-on-surface     →  text-on-surface
```

There is no `tailwind.config.js` — all token definitions live in `globals.css`.

---

## Typography

Four font families, each with a specific role:

| Variable | Font | Use |
|----------|------|-----|
| `--font-headline` | Space Grotesk | Section titles, button labels, big display text |
| `--font-body` | Epilogue | Descriptive paragraphs, running text |
| `--font-label` | Space Grotesk | UI labels (same as headline) |
| `--font-street` | Barrio | The "Stay Unhinged" display text — raw, handmade feel |
| `--font-stamp` | Council | Metadata labels, tag stamps, spec badges |

All fonts are loaded from Google Fonts via `<link>` in `app/layout.tsx`. Material Symbols Outlined is loaded separately — it's the icon font used for `favorite`, `download`, `check_circle`, etc.

### Icon font usage

Icons use the `material-symbols-outlined` class:

```html
<span class="material-symbols-outlined">favorite</span>
```

To make an icon filled (solid) vs outlined:

```html
<!-- Filled -->
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">favorite</span>

<!-- Outlined (default) -->
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0">favorite</span>
```

This is a **variable font axis**, not a different icon class.

---

## Border radius

All border radius tokens are set to `0` — sharp corners only:

```css
@theme {
  --radius:      0px;
  --radius-lg:   0px;
  --radius-xl:   0px;
  --radius-full: 9999px;   /* Only used for circular elements (logo badge) */
}
```

The only rounded elements are the logo badge circles on the hero and mobile header.

---

## Custom utility classes

Defined in `app/globals.css`:

### `.glitch-text`
```css
.glitch-text {
  text-shadow: 2px 0 #c3f400, -2px 0 #ff00ff;
}
```
Gives the VHS glitch / chromatic aberration effect to the main title. Used on the `WALLPAPERS.RYYAN SAFAR` headline.

### `.holographic-effect`
```css
.holographic-effect {
  background: linear-gradient(
    135deg,
    rgba(195, 244, 0, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(0, 209, 255, 0.1) 50%,
    rgba(195, 244, 0, 0.1) 100%
  );
  background-size: 200% 200%;
}
```
Overlaid on wallpaper cards as a `pointer-events-none` div. Adds a subtle iridescent shimmer. Used at `opacity-20` to `opacity-30`.

### `.sticker-shadow`
```css
.sticker-shadow {
  box-shadow: 0 0 40px rgba(171, 214, 0, 0.06);
}
```
A very subtle green glow shadow. Gives cards and sticker labels a faint acid-green halo.

### `.no-scrollbar`
```css
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```
Hides scrollbars on the horizontal scroll container without disabling scroll functionality.

---

## Design patterns

### The sticker label
Rotated, solid-background label positioned absolutely at the edge of a card:

```tsx
<div className="absolute -top-4 -left-2 z-20 bg-primary-fixed text-surface px-4 py-1 font-stamp text-lg rotate-[-4deg] sticker-shadow">
  #ACID_01
</div>
```

Rules:
- `absolute` position with negative offsets to hang off the card edge
- Slight rotation (`rotate-[-4deg]` to `rotate-[4deg]`)
- `font-stamp` for the monospace stamp feel
- `bg-primary-fixed` (acid green) or `bg-surface-tint` (dimmer green) for variety
- `z-20` to float above the card

### The hover reveal
Wallpaper cards desaturate on rest and reveal color on hover:

```tsx
<img className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
```

Combined with `group` on the parent and `group-hover:` on the image.

### The rotated button
Buttons have a slight resting rotation that inverses on hover, creating a "wobble" effect:

```tsx
<button className="... rotate-2 hover:-rotate-2 transition-transform ...">
```

---

## Tailwind v4 notes

This project uses **Tailwind CSS v4**, which differs significantly from v3:

1. **No `tailwind.config.js`** — everything goes in `globals.css` under `@theme {}`
2. **No `@apply` needed for custom tokens** — Tailwind v4 generates utilities from `@theme` automatically
3. **`@import "tailwindcss"`** at the top of `globals.css` instead of the three `@tailwind` directives
4. **CSS custom property names map directly to utility names** — `--color-primary-fixed` → `text-primary-fixed`, `bg-primary-fixed`, etc.
5. **`min-w-screen`** is a valid utility in v4 that resolves to `min-width: 100vw`

If you're coming from Tailwind v3, the biggest gotcha is that `tailwind.config.js` is ignored entirely. All customization is in CSS.
