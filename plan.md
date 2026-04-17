# Implementation Plan: Oilepo.com Replica

## Design System Reference (from live site audit)

**Colors:**
- Background: `#ffffff`, `#f9f9f9`, `#f5f5f5`
- Body text: `#3a3a3a`
- Dark accents: `#222`, `#111`
- Mid gray (borders/dividers): `#e6e6e6`, `#ccc`
- Muted text: `#808285`
- Accent/CTA: `#0274be`
- Social: Facebook `#557dbc`, Instagram `#8a3ab9`, LinkedIn `#1c86c6`

**Fonts (Google Fonts):**
- Headings: `Playfair Display` (400)
- Accent/decorative: `Forum` (400)
- Body/UI: `DM Sans` (400, 700)

**Mobile breakpoint:** 921px

---

## Execution Steps

### Step 1 — `src/styles/global.css`
Replace contents with:
```css
@import "tailwindcss";

@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Playfair+Display&family=Forum&display=swap");

@theme {
  /* Typography */
  --font-serif: "Playfair Display", Georgia, serif;
  --font-decorative: "Forum", Georgia, serif;
  --font-sans: "DM Sans", system-ui, sans-serif;

  /* Colors */
  --color-background: #ffffff;
  --color-surface: #f9f9f9;
  --color-surface-alt: #f5f5f5;
  --color-border: #e6e6e6;
  --color-border-mid: #ccc;
  --color-text: #3a3a3a;
  --color-text-muted: #808285;
  --color-text-dark: #222;
  --color-accent: #0274be;
  --color-accent-hover: #191970;
  --color-social-fb: #557dbc;
  --color-social-ig: #8a3ab9;
  --color-social-li: #1c86c6;

  /* Spacing scale (matches Astra-like breathable layout) */
  --section-pad-y: 6.67em;
  --section-pad-x: 1.5rem;
}

html, body {
  font-family: var(--font-sans);
  color: var(--color-text);
  background: var(--color-background);
}
```

### Step 2 — `src/layouts/BaseLayout.astro` (new file, replaces Layout.astro usage)
- Add `<ViewTransitions />` from `astro:transitions`
- Import `global.css`
- Accept `title` prop (default: "Oilepo")
- Render `<slot />`
- **Do not** include Navbar here — pages compose it themselves so full-bleed hero overlapping is possible

### Step 3 — `src/components/Header.astro` (replaces Navbar.astro)

**Desktop (≥921px):**
- Fixed/sticky top bar, transparent over hero, white on scroll (use CSS `position: sticky`)
- Logo image left (use `<Image />` from `astro:assets` with a placeholder SVG for now)
- Nav links right: Home · About · Oilepo Amboseli · Oilepo Naivasha · Photo Gallery · Contact
- "Book Now" CTA button in accent blue

**Mobile (<921px):**
- Hamburger button (3 lines, pure CSS/JS toggle)
- Full-screen overlay menu on open: links stacked vertically, centered
- Close button (×) at top-right of overlay
- Toggle handled with a tiny `<script>` inline (no framework needed)

**Styling:** `font-sans`, uppercase tracking, small font size for nav links

### Step 4 — `src/components/Hero.astro`

- Full-viewport-height section (`min-h-screen`)
- Background: CSS-based image slideshow cycling 2 placeholder images with a CSS `@keyframes` fade animation (no JS library needed — two absolutely-positioned `<Image />` elements with `animation: fade 10s infinite`)
- Centered overlay text:
  - "WELCOME TO" — `font-decorative`, large, letter-spaced
  - "OILEPO" — `font-serif`, very large (clamp ~60–120px), letter-spaced
- "Book Now" CTA button below text (accent blue, white text, hover darken)
- Dark overlay (`rgba(0,0,0,0.35)`) on top of images for legibility

### Step 5 — `src/components/Destinations.astro`

- Section with heading "OUR DESTINATIONS" (`font-serif`, centered)
- Two-column card grid (stacks on mobile)
- Each card: full-width `<Image />` placeholder → lodge name (Playfair Display link) → short description text
- Cards: "OILEPO AMBOSELI" and "OILEPO NAIVASHA"
- Light background `#f9f9f9`, generous vertical padding

### Step 6 — `src/components/ImageText.astro`

Reusable component with props:
- `heading: string`
- `body: string`
- `imageAlt: string`
- `reverse: boolean` (flips image/text order)

Layout: 2-col CSS grid (50/50), stacks on mobile. Image uses `<Image />` placeholder. Generous padding matching `--section-pad-y`.

### Step 7 — `src/components/Footer.astro`

- 3-column grid on desktop, stacked on mobile
- Col 1: Copyright `© {new Date().getFullYear()} Oilepo`
- Col 2: Social icon links (SVG icons inline) for Facebook, Instagram, LinkedIn — each colored per brand
- Col 3: Brief tagline or empty (matches live site)
- Top border `#e6e6e6`, padding `2rem 0`
- Font: DM Sans, muted text color

### Step 8 — `src/pages/index.astro`

Replace entire file:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import Destinations from '../components/Destinations.astro';
import ImageText from '../components/ImageText.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout>
  <Header />
  <Hero />
  <Destinations />
  <ImageText
    heading="Tranquil Proximity to Amboseli National Park"
    body="Situated 800m from Amboseli National Park, Oilepo Amboseli offers unparalleled access to the iconic landscapes and wildlife of one of Kenya's most celebrated reserves."
    imageAlt="Amboseli landscape"
    reverse={false}
  />
  <ImageText
    heading="For Those With an Adventurous Spirit"
    body="Wake to the sounds of the African bush. Oilepo's tented camps place you at the heart of the wilderness — game drives, sundowners, and starlit nights await."
    imageAlt="Safari game drive"
    reverse={true}
  />
  <Footer />
</BaseLayout>
```

### Step 9 — Cleanup
- Delete `src/components/Welcome.astro` (fully replaced)
- Keep `src/layouts/Layout.astro` temporarily or delete if nothing references it after step 8

---

## File Change Summary

| File | Action |
|---|---|
| `src/styles/global.css` | Rewrite |
| `src/layouts/BaseLayout.astro` | Create new |
| `src/components/Header.astro` | Create new |
| `src/components/Hero.astro` | Create new |
| `src/components/Destinations.astro` | Create new |
| `src/components/ImageText.astro` | Create new |
| `src/components/Footer.astro` | Create new |
| `src/pages/index.astro` | Rewrite |
| `src/components/Welcome.astro` | Delete |
| `src/layouts/Layout.astro` | Delete (superseded) |
| `src/components/Navbar.astro` | Delete (superseded) |
