// Earth pins: keep the eco-section HTML labels glued to their ground stations
// while the SVG ground-stations group rotates (180s per revolution, matching continents).
(function () {
  const svg = document.querySelector('.earth-illu');
  const visual = document.querySelector('.eco-visual');
  if (!svg || !visual) return;

  const labels = Array.from(document.querySelectorAll('.eco-label[data-station]'));
  if (!labels.length) return;

  // Parse SVG coords once
  const pins = labels.map(el => {
    const [x, y] = el.dataset.station.split(',').map(Number);
    return { el, x, y };
  });

  // Match the SMIL animation start: both begin at document load (begin="0s" default).
  // Use performance.now() as a close approximation; tiny phase drift is imperceptible.
  const DUR_MS = 180000; // 180s for full revolution
  const CX = 250, CY = 250;

  function update() {
    const ctm = svg.getScreenCTM();
    const visualRect = visual.getBoundingClientRect();
    if (!ctm || visualRect.width === 0) {
      requestAnimationFrame(update);
      return;
    }

    const t = (performance.now() % DUR_MS) / DUR_MS;
    const angle = t * Math.PI * 2;
    const cos = Math.cos(angle), sin = Math.sin(angle);

    const pt = svg.createSVGPoint();
    for (const p of pins) {
      const dx = p.x - CX, dy = p.y - CY;
      pt.x = CX + dx * cos - dy * sin;
      pt.y = CY + dx * sin + dy * cos;
      const screen = pt.matrixTransform(ctm);
      const left = screen.x - visualRect.left;
      const top = screen.y - visualRect.top;
      p.el.style.left = left + 'px';
      p.el.style.top = top + 'px';
    }
    requestAnimationFrame(update);
  }

  // Make sure the labels are absolutely positioned relative to .eco-visual
  // (they already are via the existing .eco-label CSS).
  requestAnimationFrame(update);
})();
