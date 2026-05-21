# Earth rotation pin changes

## Files changed
- `Clockchain 2026.html` — wrapped ground stations + mesh in an `<g class="earth-overlay">` group with a 180s `animateTransform` rotation (matches the continents rotation). Replaced the 4 hard-coded `.eco-label` positions with `data-station="x,y"` SVG coordinates that JS uses to track them. Added `<script src="earth-pins.js"></script>` near the bottom alongside the other scripts.
- `earth-pins.js` — **new file**. Per-frame, rotates each label's SVG coordinate around (250, 250) and projects it through the SVG's screen CTM so the HTML labels stay glued to their nodes as the Earth spins.

## Files NOT changed
- `styles.css` — no edits.

## How it works
1. Inside the Earth SVG, the new `<g class="earth-overlay">` contains the 4 ground stations and the dashed mesh between them. A SMIL `animateTransform` rotates the whole group 360° around (250, 250) every 180 seconds — the same rate as the continents, so they stay aligned.
2. The HTML `.eco-label` divs no longer carry static `left/top` percentages. Each carries `data-station="x,y"` (the SVG coords of its node). `earth-pins.js` reads those, rotates them by the current angle (`(performance.now() % 180000) / 180000 * 2π`), then converts the rotated SVG point to screen pixels via `svg.getScreenCTM()` and writes `left/top` on the label. The existing `transform: translate(-50%, -50%)` in CSS centers the label on that point.
