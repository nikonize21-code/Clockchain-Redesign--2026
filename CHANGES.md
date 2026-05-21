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
- JS (new file `earth-pins.js`): every frame, rotates each label's SVG coord around (250, 250) by the current angle and projects it through `svg.getScreenCTM()` so HTML labels stay glued to the rotating SVG nodes.

### 2. Readout card tagline (Hero)
- HTML: wrapped the LIVE pill in `<div class="rd-head-left">` and added `<p class="rd-tagline">` reading "Introducing *Blockchain-Enabled Time Verification* — a precision-engineered clock for unmatched accuracy and integrity."
- CSS: `.rd-head-left` (column flex), `.rd-tagline` (15px semi-bold sans, steel blue, 62ch max width), `.rd-tagline em` (18px Instrument Serif italic).

### 3. Tri-card number hover (issue-wrap-tri)
- CSS: `.issue-card .num` baseline dark blue → brand steel blue on hover with soft glow + letter-spacing widening. The pulsing `.num-dot` switches its pulse color to brand blue on hover (`@keyframes issueDotBlue`).

### 4. Service cards — title update + hover (Services section)
- HTML: third card title updated to "Timestamp API — 1st Ever Trusted, Verifiable Blockchain TimeStamp".
- HTML: added two `<span class="service-trace t-tl">` / `<span class="service-trace t-br">` to each of the 3 `article.service` cards.
- CSS hover: glyph spotlight bloom + SVG scales to ~105% with blue drop-shadow; two L-shape border traces draw from top-left and bottom-right corners. 4px lift preserved.

### 5. Quarter cards hover (Roadmap section)
- HTML: added two `<span class="quarter-trace t-tl">` / `<span class="quarter-trace t-br">` to each of the 4 `article.quarter` cards.
- CSS hover: spotlight bloom (`.quarter::after`) centered behind the Q-number badge with brighter blue and 1.5× scale; the Q-text shifts to a lit-up steel blue with strong glow; two 2px L-shape border traces draw the perimeter. 6px slide preserved.
