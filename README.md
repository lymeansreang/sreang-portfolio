# Ly Mean Sreang — Portfolio ("Bug Defense" edition)

A garden tower-defense themed portfolio built with **Next.js 16**, **React 19**, **Tailwind CSS 4** and **Framer Motion**.
Visitors can play a short mini-game — plant skills to stop bugs reaching the PROD server — or skip straight to the portfolio.

All characters and art are original SVG sprites drawn in code (`components/sprites/`).

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in your Formspree form ID
npm run dev                  # http://localhost:3000
```

## Edit your content

Everything you'd normally change lives in **`lib/portfolio.ts`**:

| Export | What it controls |
| --- | --- |
| `profile` | Name, title, tagline, location, email, social links |
| `about` | "Meet the Gardener" paragraphs |
| `waves` | Experience timeline (most recent first) |
| `seeds` | Project "seed packet" cards — set `plant` to `swift`, `thorn`, `pod` or `coffee` |
| `stats` | Chips in the top HUD |

Project images go in `public/` and are referenced as `image: "/your-file.jpg"`.

## Contact form (Formspree)

1. Create a free form at <https://formspree.io> and copy its ID (the part after `/f/`).
2. Put it in `.env.local` as `NEXT_PUBLIC_FORMSPREE_ID=xxxxxxx`.
3. On Vercel: **Project → Settings → Environment Variables** → add the same key, then redeploy.

Without the ID, the form shows a friendly "not set up yet" message instead of pretending to send.

## Project structure

```
app/
  layout.tsx          fonts (self-hosted via @fontsource), metadata
  page.tsx            page composition: HUD → game hero → sections → footer
  globals.css         design tokens (@theme) + sprite animations
components/
  hud.tsx             sticky top bar with desktop + mobile navigation
  game/bug-defense.tsx  the mini-game (requestAnimationFrame loop)
  sections.tsx        About, Experience (waves), Projects (seed packets)
  mailbox.tsx         contact form → Formspree
  sprites/            plants.tsx, bugs.tsx, props.tsx (SVG characters)
lib/portfolio.ts      all site content
```

## Tuning the game

In `components/game/bug-defense.tsx`:

- `CARDS` — plant cost, recharge time, health, fire rate
- `SCRIPT` — when each bug appears (`[seconds, kind]`)
- `BUG_INFO` in `components/sprites/bugs.tsx` — bug health and speed

The game pauses automatically when scrolled out of view, and all idle animations respect `prefers-reduced-motion`.

## Static preview build

```bash
NEXT_PUBLIC_STATIC_PREVIEW=1 npm run build   # outputs a static site to /out
```
