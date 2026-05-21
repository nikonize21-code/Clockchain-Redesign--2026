# Clockchain updates for GitHub

## Files
- `Clockchain 2026.html` — modified
- `styles.css` — modified
- `earth-pins.js` — **new file** (place at repo root next to the other JS files)

## Changes

### 1. Earth rotation pins (Ecosystem section)
- HTML: wrapped the 4 ground stations + their connecting mesh in a new `<g class="earth-overlay">`, with a 180s `animateTransform` rotation around (250, 250) — matches the continents.
- HTML: replaced the 4 hard-coded `.eco-label` `left/top` percentages with `data-station="x,y"` SVG coordinates.
- HTML: added `<script src="earth-pins.js"></script>` at the bottom alongside the other scripts.
- JS (new file `earth-pins.js`): every frame, rotates each pinned label's SVG coord around (250, 250) by the current angle and projects it through `svg.getScreenCTM()` so the HTML labels stay glued to the rotating SVG nodes regardless of viewport size.

### 2. Readout card tagline (Hero section)
- HTML: wrapped the LIVE pill in a new `<div class="rd-head-left">` and added a `<p class="rd-tagline">` reading "Introducing *Blockchain-Enabled Time Verification* — a precision-engineered clock for unmatched accuracy and integrity."
- CSS: `.rd-head-left` (column flex), `.rd-tagline` (15px semi-bold sans, steel blue, 62ch max width), `.rd-tagline em` (18px Instrument Serif italic in full brand blue). Flex layout keeps the tagline at a 16px gap from the 100px clock viz so it can't overlap.

### 3. Tri-card number hover (issue-wrap-tri)
- CSS: `.issue-card .num` baseline color changed from deep teal to dark blue (`oklch(0.42 0.09 248)`). On card hover, the number transitions to the brand steel blue (`oklch(0.72 0.12 248)`) with a soft blue glow and a small letter-spacing widening. The pulsing `.num-dot` also switches its pulse color to brand blue on hover. All transitions are smooth (.35s ease) and run *in addition to* the existing card lift, sibling-dim, and animated title rule.
