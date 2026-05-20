/* ===== Clockchain — Kinetic Interactions ===== */

(() => {
  // --- Clockchain live readout ---
  const elT = document.getElementById('rd-time');
  const elH = document.getElementById('rd-height');
  const elHss = document.getElementById('hss-height');
  const elBps = document.getElementById('hss-bps');
  const elD = document.getElementById('rd-drift');
  const elBar = document.getElementById('rd-progress-bar');
  const elList = document.getElementById('rd-block-list');
  const elDate = document.getElementById('rd-date');
  const elVal = document.getElementById('rd-validators');
  const elFootText = document.getElementById('rd-foot-text');
  const elFootStatus = document.getElementById('rd-foot-status');
  const handH = document.getElementById('rd-cvhand-h');
  const handM = document.getElementById('rd-cvhand-m');
  const handS = document.getElementById('rd-cvhand-s');

  // Genesis: 2024-01-01 00:00:00 UTC, 1 block / second
  const GENESIS = Date.UTC(2024, 0, 1, 0, 0, 0);
  const pad = (n, w = 2) => String(n).padStart(w, '0');

  // Validator pool
  const VALIDATORS = [
    'val_orbit_4281', 'val_core_1749', 'val_nimbus_9067', 'val_glitch_3349',
    'val_atlas_1182', 'val_cosmos_7715', 'val_helios_2206', 'val_aurora_5530',
    'val_polar_9911', 'val_quartz_3047', 'val_zenith_6624', 'val_meridian_4408',
  ];
  const VALIDATOR_COUNT = 128;

  // Deterministic pseudo-random from height
  function hash32(n) {
    let x = (n ^ 0x9e3779b9) >>> 0;
    x = (x ^ (x << 13)) >>> 0;
    x = (x ^ (x >>> 17)) >>> 0;
    x = (x ^ (x << 5)) >>> 0;
    return x >>> 0;
  }
  function validatorFor(height) {
    return VALIDATORS[hash32(height) % VALIDATORS.length];
  }
  function driftFor(height) {
    // Deterministic small drift ±0.2 ms
    const r = (hash32(height + 7) % 1000) / 1000; // 0..1
    const v = (r * 0.4 - 0.2);
    const sign = v >= 0 ? '+' : '−';
    return `${sign}${Math.abs(v).toFixed(3)} ms`;
  }

  let lastHeight = -1;

  function makeBlock(height) {
    const t = new Date(GENESIS + height * 1000);
    const tStr = `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`;
    const num = '#' + height.toLocaleString('en-US');
    const row = document.createElement('div');
    row.className = 'rd-block';
    row.innerHTML = `
      <span class="b-height">${num}</span>
      <span class="b-time">${tStr}</span>
      <span class="b-validator">${validatorFor(height)}</span>
      <span class="b-drift">${driftFor(height)}</span>
    `;
    return row;
  }

  const MAX_BLOCKS = 4;
  function seedBlocks() {
    const now = Date.now();
    const h = Math.floor((now - GENESIS) / 1000);
    for (let i = MAX_BLOCKS - 1; i >= 0; i--) {
      elList.appendChild(makeBlock(h - i));
    }
    lastHeight = h;
  }
  if (elList) seedBlocks();

  function pushBlock(height) {
    if (!elList) return;
    const row = makeBlock(height);
    row.classList.add('new');
    elList.insertBefore(row, elList.firstChild);
    while (elList.children.length > MAX_BLOCKS) {
      elList.lastElementChild.remove();
    }
    setTimeout(() => row.classList.remove('new'), 1000);
  }

  // --- 60fps ticker ---
  function tick() {
    const now = Date.now();
    const d = new Date(now);
    const hh = d.getUTCHours();
    const mm = d.getUTCMinutes();
    const ss = d.getUTCSeconds();
    const ms = d.getUTCMilliseconds();

    if (elT) {
      elT.innerHTML = `${pad(hh)}<span class="sep">:</span>${pad(mm)}<span class="sep">:</span>${pad(ss)}<span class="ms">.${pad(ms,3)}</span>`;
    }
    if (elDate) {
      elDate.textContent = `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}`;
    }

    const height = Math.floor((now - GENESIS) / 1000);
    if (elH) elH.textContent = '#' + height.toLocaleString('en-US');
    if (elHss) elHss.textContent = height.toLocaleString('en-US');
    if (elBps) {
      // Tiny natural jitter around 1.000 bps
      const bps = 1 + Math.sin(now / 4300) * 0.005 + Math.sin(now / 1300) * 0.0015;
      elBps.textContent = bps.toFixed(3);
    }

    const drift = (Math.sin(now / 7000) * 0.012 + Math.sin(now / 1500) * 0.004);
    if (elD) elD.textContent = `±${Math.abs(drift).toFixed(3)} ms`;

    if (elBar) elBar.style.width = ((ms / 1000) * 100).toFixed(2) + '%';

    // Validators count gently wiggles around base
    if (elVal) {
      const offset = Math.floor(Math.sin(now / 11000) * 1.4);
      elVal.textContent = (VALIDATOR_COUNT + offset).toString();
    }
    if (elFootText) {
      elFootText.textContent = `Network secured by ${VALIDATOR_COUNT} validators`;
    }
    if (elFootStatus) {
      elFootStatus.textContent = 'Updated just now';
    }

    // Clock face hands
    if (handS) {
      const sa = (ss + ms / 1000) * 6;
      handS.style.transform = `rotate(${sa}deg)`;
    }
    if (handM) {
      const ma = (mm + ss / 60) * 6;
      handM.style.transform = `rotate(${ma}deg)`;
    }
    if (handH) {
      const ha = ((hh % 12) + mm / 60) * 30;
      handH.style.transform = `rotate(${ha}deg)`;
    }

    if (height !== lastHeight && lastHeight !== -1) pushBlock(height);
    lastHeight = height;

    requestAnimationFrame(tick);
  }
  tick();

  // --- Magnetic 3D tilt on the card ---
  const card3D = document.querySelector('.readout.readout-3d');
  const wrap3D = document.querySelector('.readout-3d-wrap');
  if (card3D && wrap3D && matchMedia('(hover: hover)').matches) {
    let raf = 0;
    let tx = -7, ty = 3;
    wrap3D.addEventListener('mousemove', (ev) => {
      const r = wrap3D.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width;
      const py = (ev.clientY - r.top) / r.height;
      tx = -7 + (px - 0.5) * 8;       // -11 .. -3
      ty = 3 + (py - 0.5) * -6;       //   6 ..  0
      if (!raf) raf = requestAnimationFrame(() => {
        card3D.style.transform = `rotateY(${tx.toFixed(2)}deg) rotateX(${ty.toFixed(2)}deg)`;
        raf = 0;
      });
    });
    wrap3D.addEventListener('mouseleave', () => {
      card3D.style.transform = '';
    });
  }

  // --- Nav scroll state ---
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Reveal on intersect ---
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Directional reveals start off-screen, so the observer may never see them.
  // Trigger them explicitly on next frame so the slide-in plays on load.
  requestAnimationFrame(() => {
    document.querySelectorAll('.reveal[data-reveal]').forEach((el) => {
      requestAnimationFrame(() => el.classList.add('in'));
      io.unobserve(el);
    });
  });

  // Swipe reveals: elements with [data-swipe] start off-canvas, so IO cannot
  // see them at their layout position. Instead, observe the containing section
  // (which is untransformed) and trigger every swipe child on intersection.
  const swipeIO = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.querySelectorAll('[data-swipe]:not(.in)').forEach((el) => {
          el.classList.add('in');
          io.unobserve(el);
        });
        swipeIO.unobserve(e.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
  const swipeRoots = new Set();
  document.querySelectorAll('[data-swipe]').forEach((el) => {
    const root = el.closest('section') || el.parentElement;
    if (root) swipeRoots.add(root);
  });
  swipeRoots.forEach((root) => swipeIO.observe(root));

  // --- Kinetic title: scroll-driven weight / letter-spacing ---
  const title = document.querySelector('.kinetic-title');
  if (title) {
    const words = title.querySelectorAll('.word');
    let ticking = false;
    const update = () => {
      if (document.documentElement.dataset.kinetic === 'aggressive') {
        // CSS keyframes own the title in aggressive mode — clear inline overrides
        title.style.removeProperty('font-weight');
        title.style.removeProperty('letter-spacing');
        title.style.removeProperty('transform');
        ticking = false;
        return;
      }
      const y = window.scrollY;
      const max = window.innerHeight * 0.9;
      const t = Math.min(1, Math.max(0, y / max));
      // Weight: 700 -> 500, letter-spacing tightens
      const w = 700 - t * 220;
      const ls = -0.035 - t * 0.02;
      const tx = -t * 16;
      title.style.setProperty('font-weight', w.toFixed(0));
      title.style.setProperty('letter-spacing', `${ls.toFixed(3)}em`);
      // Only commandeer transform once scrolled — otherwise the reveal slide-in owns it
      if (y > 0) {
        title.style.setProperty('transform', `translateY(${tx.toFixed(1)}px)`);
      } else {
        title.style.removeProperty('transform');
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();

    // Mouse-magnetic per-word weight shift
    title.addEventListener('mousemove', (ev) => {
      if (document.documentElement.dataset.kinetic === 'aggressive') return;
      const tRect = title.getBoundingClientRect();
      words.forEach((word) => {
        const r = word.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = ev.clientX - cx;
        const dy = ev.clientY - cy;
        const d = Math.hypot(dx, dy);
        const reach = 280;
        const strength = Math.max(0, 1 - d / reach);
        const w = 500 + strength * 250;
        word.style.fontWeight = w.toFixed(0);
      });
    });
    title.addEventListener('mouseleave', () => {
      words.forEach((w) => (w.style.fontWeight = ''));
    });
  }

  // --- Solution-card tilt + radial glow follow ---
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (ev) => {
      const r = card.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width;
      const py = (ev.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -4;
      const ry = (px - 0.5) * 4;
      card.style.transform = `translateY(-6px) perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // --- Smooth anchor offset for fixed nav ---
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (t) {
        e.preventDefault();
        const top = t.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Ecosystem visual subtle parallax ---
  const eco = document.querySelector('.eco-visual');
  if (eco) {
    eco.addEventListener('mousemove', (ev) => {
      const r = eco.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width - 0.5;
      const py = (ev.clientY - r.top) / r.height - 0.5;
      eco.querySelectorAll('.node, .node-label').forEach((n, i) => {
        const m = 6 + (i % 3) * 4;
        n.style.transform = `translate(calc(-50% + ${(-px * m).toFixed(1)}px), calc(-50% + ${(-py * m).toFixed(1)}px))`;
      });
      const core = eco.querySelector('.core');
      if (core) core.style.transform = `translate(calc(-50% + ${(-px * 4).toFixed(1)}px), calc(-50% + ${(-py * 4).toFixed(1)}px))`;
    });
    eco.addEventListener('mouseleave', () => {
      eco.querySelectorAll('.node, .node-label, .core').forEach((n) => {
        n.style.transform = '';
      });
    });
  }
  // --- Featured visual: streaming blocks canvas ---
  const fvCanvas = document.getElementById('fv-blocks');
  if (fvCanvas) {
    const ctx = fvCanvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const resize = () => {
      const r = fvCanvas.getBoundingClientRect();
      W = r.width; H = r.height;
      fvCanvas.width = W * DPR;
      fvCanvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    new ResizeObserver(resize).observe(fvCanvas);

    const hexBlock = (i) => {
      const seed = (i * 2654435761) >>> 0;
      let h = '';
      for (let k = 0; k < 8; k++) {
        h += ((seed >> (k * 4)) & 0xf).toString(16);
      }
      return `BLK ${(7821000 + i).toLocaleString()} · 0x${h}`;
    };
    const timeBlock = (i) => {
      const d = new Date(Date.now() - i * 1000);
      return `${d.toISOString().replace('T', ' ').slice(0, 19)}Z · sig OK`;
    };

    const streams = [
      { y: 0.20, speed: 60,  font: '11px "JetBrains Mono", monospace', alpha: 0.55, gen: hexBlock, span: 220 },
      { y: 0.50, speed: -90, font: '11px "JetBrains Mono", monospace', alpha: 0.30, gen: hexBlock, span: 240 },
      { y: 0.80, speed: 45,  font: '11px "JetBrains Mono", monospace', alpha: 0.45, gen: timeBlock, span: 260 },
    ];

    streams.forEach((s) => {
      const count = 14;
      s.labels = Array.from({ length: count }, (_, i) => s.gen(i));
      s.totalW = count * s.span;
    });

    let last = 0;
    streams.forEach((s) => (s.off = 0));

    function frame(t) {
      const dt = last ? (t - last) / 1000 : 0;
      last = t;
      ctx.clearRect(0, 0, W, H);

      // soft horizontal lines
      ctx.strokeStyle = 'oklch(1 0 0 / 0.04)';
      ctx.lineWidth = 1;
      for (let i = 1; i < 10; i++) {
        const yy = (i / 10) * H;
        ctx.beginPath();
        ctx.moveTo(0, yy); ctx.lineTo(W, yy); ctx.stroke();
      }

      streams.forEach((s) => {
        s.off = (s.off + s.speed * dt) % s.totalW;
        if (s.off < 0) s.off += s.totalW;

        ctx.font = s.font;
        ctx.fillStyle = `oklch(0.72 0.255 142 / ${s.alpha})`;
        ctx.textBaseline = 'middle';
        const y = s.y * H;
        // Render two copies for seamless wrap
        for (let pass = 0; pass < 2; pass++) {
          s.labels.forEach((lbl, i) => {
            const x = i * s.span - s.off + pass * s.totalW;
            if (x > -200 && x < W + 200) {
              ctx.fillText(lbl, x, y);
            }
          });
        }
      });

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // --- Hero background video: smooth fade-in + crossfade loop ---
  const heroVid = document.getElementById('hero-video');
  if (heroVid) {
    // Attach HLS if data-hls is set, fall back to native (Safari) HLS
    const hlsUrl = heroVid.getAttribute('data-hls');
    if (hlsUrl) {
      if (heroVid.canPlayType('application/vnd.apple.mpegurl')) {
        heroVid.src = hlsUrl;
      } else if (window.Hls && window.Hls.isSupported()) {
        const hls = new window.Hls({ lowLatencyMode: true });
        hls.loadSource(hlsUrl);
        hls.attachMedia(heroVid);
      } else {
        // No HLS support — leave video blank, hero falls back to overlays
        heroVid.removeAttribute('data-hls');
      }
    }

    // Attach HLS to any OTHER [data-hls] videos (e.g. the Issues section bg)
    document.querySelectorAll('video[data-hls]').forEach((vid) => {
      if (vid === heroVid) return; // already handled above
      const url = vid.getAttribute('data-hls');
      if (!url) return;
      if (vid.canPlayType('application/vnd.apple.mpegurl')) {
        vid.src = url;
      } else if (window.Hls && window.Hls.isSupported()) {
        const h = new window.Hls({ lowLatencyMode: false });
        h.loadSource(url);
        h.attachMedia(vid);
      } else {
        vid.removeAttribute('data-hls');
      }
    });

    const FADE_MS = 600;
    const FADE_OUT_LEAD = 0.6; // seconds before end to start fading

    const animateOpacity = (from, to, duration) => {
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        heroVid.style.opacity = (from + (to - from) * eased).toFixed(3);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    heroVid.addEventListener('canplay', () => {
      const playP = heroVid.play();
      if (playP && playP.catch) playP.catch(() => {});
      animateOpacity(0, 1, FADE_MS);
    }, { once: true });

    let fadingOut = false;
    heroVid.addEventListener('timeupdate', () => {
      if (!heroVid.duration || !isFinite(heroVid.duration)) return;
      const remaining = heroVid.duration - heroVid.currentTime;
      if (!fadingOut && remaining <= FADE_OUT_LEAD) {
        fadingOut = true;
        animateOpacity(parseFloat(heroVid.style.opacity || 1), 0, FADE_MS);
      }
    });

    heroVid.addEventListener('ended', () => {
      heroVid.style.opacity = '0';
      setTimeout(() => {
        heroVid.currentTime = 0;
        const p = heroVid.play();
        if (p && p.catch) p.catch(() => {});
        fadingOut = false;
        animateOpacity(0, 1, FADE_MS);
      }, 120);
    });

    // Some browsers/autoplay policies skip 'canplay' if the video is already buffered
    if (heroVid.readyState >= 3) {
      const p = heroVid.play();
      if (p && p.catch) p.catch(() => {});
      animateOpacity(0, 1, FADE_MS);
    }

    // Subtle parallax: video drifts slightly opposite scroll for depth
    let pTicking = false;
    window.addEventListener('scroll', () => {
      if (pTicking) return;
      pTicking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        const tx = -y * 0.04;
        const ty = y * 0.12;
        heroVid.style.translate = `${tx.toFixed(1)}px ${ty.toFixed(1)}px`;
        pTicking = false;
      });
    }, { passive: true });
  }

  // --- Auth illustration: LED timestamp tickers ---
  const authTsEls = document.querySelectorAll('.auth-illu .ts');
  if (authTsEls.length) {
    const pad = (n) => n.toString().padStart(2, '0');
    // Each readout has its own "clock" with a random offset to look like different regions
    const clocks = Array.from(authTsEls).map(() => {
      const baseMs = Date.now() - Math.floor(Math.random() * 86400000);
      return { baseMs, rate: 1 + Math.random() * 0.4 }; // each ticks at slightly different rate
    });
    function authTick() {
      const now = Date.now();
      authTsEls.forEach((el, i) => {
        const c = clocks[i];
        const t = new Date(c.baseMs + (now - c.baseMs) * c.rate);
        el.textContent = `${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`;
      });
    }
    authTick();
    setInterval(authTick, 1000);
  }

})();
