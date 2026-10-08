# AK EDITS — Portfolio Site

React + Vite rebuild of the AK EDITS portfolio, matching the original brand
(crimson/black cinematic theme) with a proper component architecture.

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run lint     # oxlint
```

## Before going live

1. **Replace the placeholder assets** in `public/assets/` — see
   `public/assets/README.md` for exactly what each one is and what to swap
   it for (profile photo, business card, project video clips).
2. **Reviews are localStorage-only right now** (see `src/lib/reviews.js`) —
   each visitor only sees reviews posted from their own browser, not a
   shared public wall. To make reviews actually public, wire
   `fetchReviews`/`postReview` to a real backend (a Supabase table with
   public INSERT + SELECT policies is the fastest path).
3. **Update `src/data/content.js`** — the Instagram link is a placeholder
   (`#`); the rest of the contact info, pricing, services and process
   copy all live in this one file.

## Project structure

- `src/data/content.js` — all site copy and data (nav, pricing, services,
  portfolio projects, process steps, contact info) in one place.
- `src/components/` — one component + co-located CSS file per section.
- `src/hooks/` — `useReveal` (scroll-triggered fade-in), `useCounter`
  (animated number counting), `usePrefersReducedMotion`.
- `src/lib/` — `reviews.js` (storage), `ModalContext.jsx` /
  `modalStore.js` (shared lightbox state for the portfolio grid and the
  business-card preview).
