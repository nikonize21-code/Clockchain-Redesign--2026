/* ============================================================
   Clockchain — HLS background video loader
   Loads any <video data-hls-bg="..."> via hls.js (or native HLS in Safari).
   ============================================================ */

(function () {
  'use strict';

  function loadVideo(video) {
    const src = video.getAttribute('data-hls-bg');
    if (!src) return;

    // Silently swallow native video errors — this is a decorative background.
    video.addEventListener('error', (e) => { e.stopImmediatePropagation(); }, true);

    // Native HLS (Safari, iOS)
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      tryPlay(video);
      return;
    }

    // hls.js (Chrome, Firefox, Edge)
    if (typeof window.Hls !== 'undefined' && window.Hls.isSupported()) {
      const hls = new window.Hls({
        // tuned for background video — small buffer, low latency
        maxBufferLength: 8,
        maxMaxBufferLength: 16,
        capLevelToPlayerSize: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(window.Hls.Events.MANIFEST_PARSED, () => tryPlay(video));
      hls.on(window.Hls.Events.ERROR, (_e, data) => {
        if (data.fatal) {
          // silent fail — video is decorative (e.g. preview iframe blocks CDN)
          hls.destroy();
        }
      });
      // Stash on element in case we need to control it later
      video._hls = hls;
    }
  }

  function tryPlay(video) {
    const p = video.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        // autoplay blocked — first user interaction will retry
        const retry = () => {
          video.play().catch(() => {});
          window.removeEventListener('pointerdown', retry);
          window.removeEventListener('keydown', retry);
        };
        window.addEventListener('pointerdown', retry, { once: true });
        window.addEventListener('keydown', retry, { once: true });
      });
    }
  }

  function init() {
    // Skip background video loading inside preview iframes where third-party CDN
    // fetches are blocked. The video will load normally on the deployed site.
    let inSandboxedIframe = false;
    try {
      inSandboxedIframe = window.self !== window.top;
    } catch (e) {
      inSandboxedIframe = true; // cross-origin parent, definitely iframed
    }
    if (inSandboxedIframe) {
      // Mark videos so the layout still reflects their presence (just no playback)
      document.querySelectorAll('video[data-hls-bg]').forEach(v => {
        v.setAttribute('data-preview-skip', '');
        v.removeAttribute('autoplay');
      });
      return;
    }
    document.querySelectorAll('video[data-hls-bg]').forEach(loadVideo);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
