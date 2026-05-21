# Clockchain updates for GitHub

## Files
- `Clockchain 2026.html` — modified
- `styles.css` — modified
- `earth-pins.js` — **new file** (place at repo root next to the other JS files)

## Changes

### 1. Earth rotation pins (Ecosystem section)
- HTML: wrapped the 4 ground stations + connecting mesh in `<g class="earth-overlay">` with a 180s SMIL `animateTransform` rotation around (250, 250) — matches the continents.
- HTML: replaced hard-coded `.eco-label` `left/top` percentages with `data-station="x,y"` SVG coordinates.
- HTML: added `<script src="earth-pins.js"></script>` near the bottom alongside the other scripts.
- JS (new file `earth-pins.js`): every frame, rotates each label's SVG coord around (250, 250) by the current angle and projects it through `svg.getScreenCTM()` so HTML labels stay glued to the rotating SVG nodes regardless of viewport.

### 2. Readout card tagline (Hero)
- HTML: wrapped the LIVE pill in `<div class="rd-head-left">` and added a `<p class="rd-tagline">` reading "Introducing *Blockchain-Enabled Time Verification* — a precision-engineered clock for unmatched accuracy and integrity."
- CSS: `.rd-head-left` (column flex), `.rd-tagline` (15px semi-bold sans, steel blue, 62ch max width), `.rd-tagline em` (18px Instrument Serif italic in full brand blue). Flex layout keeps a 16px gap from the clock so no overlap.

### 3. Tri-card number hover (issue-wrap-tri)
- CSS: `.issue-card .num` baseline color → dark blue (`oklch(0.42 0.09 248)`). On hover, transitions to brand steel blue (`oklch(0.72 0.12 248)`) with a soft blue glow + slight letter-spacing widening. The pulsing `.num-dot` also switches its pulse color to brand blue on hover (`@keyframes issueDotBlue`). All on `.35s ease` transitions.

### 4. Service cards — title update + hover (Services section)
- HTML: updated title to "Timestamp API — 1st Ever Trusted, Verifiable Blockchain TimeStamp" on the third card.
- HTML: added two `<span class="service-trace t-tl">` / `<span class="service-trace t-br">` elements at the top of each of the 3 `article.service` cards.
- CSS: on `.service:hover`:
  - **Glyph spotlight bloom** — a soft steel-blue radial glow (`.glyph::before`) fades in behind the SVG illustration; the SVG itself scales to ~105% and gets a blue drop-shadow.
  - **Border trace** — the two L-shaped trace spans grow width then height (top-left corner draws top edge + left edge; bottom-right corner draws bottom edge + right edge). Brand steel blue, 1.5px, with a subtle outer glow. ~0.7s total to complete the perimeter.
  - The existing 4px `translateY` lift still runs on top.
