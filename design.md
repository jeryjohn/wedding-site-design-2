# Event Invite Design

A single-page, mobile-first digital invitation designed for maximum impact and reusability. It renders an elegant invite card with a live countdown, an embedded venue map, and a confetti celebration that fires the moment the event starts.

## Design Features

- **Live countdown** to the event, ticking down days / hours / minutes / seconds, that switches to a celebratory state once the date is reached.
- **Confetti burst** — full-screen confetti fall triggers automatically when the countdown hits zero. Respects `prefers-reduced-motion`.
- **Embedded map** with a "Get Directions" link to the venue.
- **Centralized copy** — all user-facing text, the event date, asset paths, and URLs live in a constants folder so the card can be re-skinned for a different event by editing data only.
- Subtle animated botanical ornaments, a decorative arch photo frame, and a scroll cue.

## Customizing the Card

Everything you'd change for a new event is data, not markup:

- **Text & event date** — The date constant is the single source of truth for both the countdown and the displayed date; a centralized strings object holds all copy (names, labels, RSVP note, etc.).
- **Map & directions URLs** — Easily swappable links.
- **Images** — The hero photo and static assets are configured via a simple assets map.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4 + CSS Modules
- TypeScript
- Confetti rendered on a `<canvas>` — no external animation library
