# Changes — May 2026

Release notes for the current site update.

## Navigation
- **Added `Problem` link** to the left of `Solution`. Anchors to the existing
  "Issues Around Timekeeping and Timestamps" section (which now carries
  `id="problem"`).
- **Added `Blog` link** between `Ecosystem` and `News`. Anchors to a new
  placeholder Blog section.
- **Removed `Roadmap`** from the primary nav and from the footer.
- **Wordmark + logo scaled up ~33%** for stronger presence — wordmark
  34px → 45px, logo mark 52px → 69px.

## Hero
- **Removed the background video** (Mux HLS stream + tint + vignette + grid
  overlay). Hero now sits on the page's base background.
- **Removed the "Trusted by builders" chip row** (PENDA approved, Certora of
  Neurolelle, Sealos registered).

## Content
- **Removed the kinetic ticker marquee** (TIMESTAMP · VERIFY · LOG ·
  SCHEDULE · SYNCHRONIZE · EXECUTE) between the hero and Issues section.
- **Removed the Roadmap section** in its entirety.
- **News pill label** changed from "From the team" → "Press Releases".

## New
- **Blog section** added between Ecosystem and News. Reuses the News & Media
  visual system (ticker, section head, press-grid with 1 lead card + 2
  compact cards). All content is placeholder — titles, deks, and dates are
  ready to be filled in with real posts.

---

## Files touched

- `index.html` — nav links, hero markup, ticker removal, Roadmap removal,
  Blog section added, pill label
- `styles.css` — `.nav-logo` font-size + `.nav-logo .mark` dimensions

No JS files were changed in this release.
