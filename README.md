# Clockchain — Marketing Site

Static marketing site for Clockchain. Pure HTML / CSS / JS — no build step, no
dependencies to install. Drop the contents of this folder onto any static host
and the site is live.

---

## File layout

```
package/
├── index.html              ← entry point
├── styles.css              ← global stylesheet
├── kinetic.js              ← reveal/scroll animations
├── tweaks.js               ← in-page tweak panel (dev only)
├── news-modal.js           ← article reader modal
├── earth-pins.js           ← ground-station label tracking
├── assets/
│   └── clockchain-logo.png ← favicon + nav/footer logo
├── .nojekyll               ← disables Jekyll processing on GitHub Pages
└── README.md               ← this file
```

External resources loaded at runtime (no install needed, fetched by browser):

- Google Fonts — Space Grotesk, JetBrains Mono, Instrument Serif
- `hls.js@1.5.13` (jsdelivr CDN) — HLS video playback for the Issues + News
  background videos
- Mux streams (`stream.mux.com/*.m3u8`) — Issues + News background video

---

## Deploying to GitHub Pages

1. **Push to your repo.** Copy the contents of `package/` into the root of
   your `gh-pages` branch (or the `/docs` folder of `main`, or wherever your
   Pages source is configured).

   ```bash
   # from your local clone
   cp -R package/* /path/to/your/repo/
   cd /path/to/your/repo/
   git add .
   git commit -m "Site update: remove ticker + hero video, restructure nav, add Blog placeholder"
   git push origin main
   ```

2. **Confirm Pages settings.** Repo → Settings → Pages → Source = the branch
   and folder you pushed to. Custom domain (e.g. clockchain.network) stays as
   configured.

3. **Wait ~1 minute** for Pages to rebuild, then hard-refresh the live site.

The included `.nojekyll` file prevents GitHub Pages from running Jekyll on the
folder — this matters because Jekyll skips files/folders starting with `_`.

---

## Deploying anywhere else

Drop the folder onto any static host:

- **Netlify / Vercel** — drag-and-drop the folder, or point at the repo with
  no build command and publish directory = `/` (or `/package` if you keep this
  subfolder).
- **S3 / Cloudflare R2 / any CDN** — sync the folder to the bucket and serve
  `index.html` as the default document.
- **Plain Nginx/Apache** — point the document root at this folder.

No environment variables, no secrets.

---

## Recent changes

See `CHANGES.md` for the change log behind this release.
