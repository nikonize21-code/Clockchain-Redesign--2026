# Updates for GitHub

## Files changed
- `Clockchain 2026.html`
  - **Ecosystem section** — wrapped the 4 ground stations + their mesh in a new `<g class="earth-overlay">` with a 180s `animateTransform` rotation (matches the continents). Replaced the 4 hard-coded `.eco-label` positions with `data-station="x,y"` SVG coords used by JS.
  - **Readout card** — added a new `<div class="rd-head-left">` wrapper around the LIVE pill and a new `<p class="rd-tagline">` containing "Introducing *Blockchain-Enabled Time Verification* — a precision-engineered clock for unmatched accuracy and integrity."
  - Loaded `earth-pins.js` at the bottom alongside the other scripts.

- `styles.css`
  - Added `.rd-head-left` (column flex wrapper) and `.rd-tagline` styles (steel-blue, semi-bold sans body at 15px, italic Instrument Serif phrase at 18px, max-width 62ch, line-height 1.4, text-wrap: pretty). The flex layout keeps the tagline at a 16px gap from the 100px clock visualization so it never overlaps.

- `earth-pins.js` — **new file**. Per-frame, rotates each pinned label's SVG coord around (250, 250) and projects it through `svg.getScreenCTM()` so the HTML labels stay glued to the rotating SVG nodes.

## How the Earth pinning works
1. `<g class="earth-overlay">` contains the 4 ground stations and the dashed mesh. A SMIL `animateTransform` rotates the group 360° around (250, 250) every 180s — same rate as the continents.
2. `earth-pins.js` reads each `.eco-label[data-station]`, rotates its SVG coord by `(performance.now() % 180000) / 180000 * 2π`, projects to screen via `getScreenCTM()`, and writes `left/top` in px. The existing `transform: translate(-50%, -50%)` in CSS centers each label on its point.
