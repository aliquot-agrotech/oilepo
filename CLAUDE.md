# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
bun dev        # Start dev server at localhost:4321
bun build      # Build to ./dist/
bun preview    # Preview production build
bun astro ...  # Run Astro CLI commands (e.g. astro add, astro check)
```

## Architecture

This is an **Astro 6** project using **Tailwind CSS v4** (via `@tailwindcss/vite` plugin) replicating [oilepo.com](https://oilepo.com/) — a luxury Kenya safari camp site. TypeScript is in strict mode.

### Layout & pages

- `src/layouts/BaseLayout.astro` — root HTML shell; imports `global.css`, mounts `<ClientRouter />` (Astro 6 View Transitions). Pages compose `<Header />` and `<Footer />` themselves so the hero can sit flush under the transparent nav.
- Pages: `index`, `about`, `amboseli`, `naivasha`, `gallery` — all in `src/pages/`

### Components

| Component | Purpose |
|---|---|
| `Header.astro` | Fixed top nav; desktop links + "Book Now" CTA; hamburger → full-screen overlay on mobile (<921px) |
| `Hero.astro` | Full-viewport hero with CSS crossfade slideshow, dark overlay, Playfair Display heading |
| `Destinations.astro` | "Our Destinations" 2-column card section |
| `ImageText.astro` | Reusable 50/50 image+text section; accepts `reverse` (flips columns) and `light` (alt background) props |
| `Footer.astro` | 3-col: brand / social icons (FB·IG·LI) / copyright with `new Date().getFullYear()` |

### Styling

`src/styles/global.css` is the single CSS entry point. Structure:
1. Google Fonts `@import` (must come **before** `@import "tailwindcss"` — PostCSS requirement)
2. `@import "tailwindcss"`
3. `@theme {}` block with all design tokens

**Design tokens** (all in `@theme`):
- Fonts: `--font-serif` (Playfair Display), `--font-decorative` (Forum), `--font-sans` (DM Sans)
- Colors: `--color-accent` (#0274be), `--color-text` (#3a3a3a), `--color-surface` (#f9f9f9), etc.

Tailwind v4 is CSS-first — theme lives in `@theme {}`, not `tailwind.config.*`.

### Images

All images use `<Image />` from `astro:assets`. Current images are placeholders (`src/assets/placeholder.svg`). Real photos follow the naming conventions from the live site: `DJI_XXXX` (drone/aerial), `RR5H XXXX` (professional photography), `TepStudios-XXX` (studio shots).

### Known gotchas

- **Apostrophes in JS data arrays**: use double-quoted strings when the value contains a `'` (e.g. `"East Africa's coast"` not `'East Africa\'s coast'`) — the esbuild JSX transform will misparse single-quoted strings with unescaped apostrophes.
- **View Transitions**: Astro 6 uses `ClientRouter` from `astro:transitions`, not the old `ViewTransitions`.
- **Google Fonts `@import`** must precede `@import "tailwindcss"` in `global.css` or PostCSS will warn and fonts may not load.

## MCP

`mcp.json` configures an Astro docs MCP server (`https://mcp.docs.astro.build/mcp`) — use it to look up Astro APIs and patterns without leaving the editor.
