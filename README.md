# Site Update — News Section Rebuild

Upload these 4 files to your GitHub repo to apply this release.

## Files in this package

```
index.html                          ← rename to your repo's HTML filename if needed
styles.css                          ← stylesheet (added Press Release list styles)
news-modal.js                       ← article modal data (6 press release entries)
assets/clockchain-time-pr.png       ← NEW: branded Earth + Clockchain Time graphic
```

## How to upload on GitHub.com

1. Open your repo on github.com.
2. **If your repo's homepage file is named `Clockchain 2026.html`** (or anything other than `index.html`), rename `index.html` in this package to match before uploading.
3. Drag-and-drop, one folder at a time:
   - **Repo root** → drop `index.html` (or renamed), `styles.css`, `news-modal.js`. These replace existing files.
   - **`assets/` folder** → open it, then drop `clockchain-time-pr.png`. This is a **new** file (the existing assets are untouched).
4. Commit with a message like *"News section: chronological press releases + branded lead image"*.
5. Wait ~1 minute for GitHub Pages to rebuild, then hard-refresh the live site (Cmd/Ctrl + Shift + R).

## What changed

- **News section rebuilt** as a chronological press-release feed (newest first):
  - **Lead card** (Feb 24, 2026 — public testnet) with the branded *Clockchain Time* graphic, full PR title, and tag.
  - **5 text-only releases** below in date order — Jun 3 2025, Jan 22 2025, Oct 16 2024, Aug 13 2024, Jun 24 2024.
- Each release opens the in-page article modal; the modal's footer "Open original →" link points to the real blockchainwire / einpresswire / prweb URL.
- **Media subsection** (Blockzeit / MEXC / Blockchain Wire press coverage) left unchanged.
- Count badge updated to **6 releases**.

## What you do NOT need to upload

`kinetic.js`, `tweaks.js`, `earth-pins.js`, and existing assets (`clockchain-logo.png`, `clockchain-logo-full.png`) were not changed. Skip them.
