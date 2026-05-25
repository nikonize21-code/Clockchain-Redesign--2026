# Site Update — May 2026

Upload these files to your GitHub repo to apply this release.

## Files in this package

```
index.html                          ← main HTML (rename if your repo uses a different filename)
styles.css                          ← stylesheet
assets/clockchain-logo-full.png     ← NEW combined logo + wordmark
```

## How to upload on GitHub.com

1. Open your repo on github.com.
2. **If your repo's homepage file is named `Clockchain 2026.html`** (or anything other than `index.html`), rename `index.html` in this package to match before uploading. Otherwise GitHub Pages won't find the homepage.
3. Drag-and-drop:
   - `index.html` (or your renamed file) into the repo root → replaces existing.
   - `styles.css` into the repo root → replaces existing.
   - `assets/clockchain-logo-full.png` into the `assets/` folder → this is a **new file**.
4. Scroll down, write a commit message like *"Logo swap + Blog section + nav cleanup"*, and commit.
5. Wait ~1 minute for Pages to rebuild, then hard-refresh the live site (Cmd/Ctrl + Shift + R).

## What changed in this release

- New combined Clockchain logo (mark + wordmark) in nav and footer.
- Old `assets/clockchain-logo.png` is no longer referenced — you can leave it in the repo or delete it; the site no longer loads it.
- `styles.css`: nav and footer logo sizing updated to fit the new wordmark aspect ratio.
- Blog section added; Roadmap removed; hero video and ticker removed; Problem + Blog links in nav; News pill renamed to "Press Releases".

## What you do NOT need to upload

The following files were not changed and should be left alone:
`kinetic.js`, `tweaks.js`, `news-modal.js`, `earth-pins.js`, `assets/clockchain-logo.png` (old, unused but harmless).
