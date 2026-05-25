# Site Update — Blog Launch

Upload these files to your GitHub repo to apply this release.

## What's new in this release

- **Blog section** on the homepage now has a real lead card (the 1949 atomic clock photo) and links to the first post.
- **First blog post**: `A Brief History of Time and Timekeeping` — a long-form article with a vertical timeline from the Big Bang to Clockchain 2026, using the body text and 9 images from your document.

## Files in this package

```
index.html                                ← homepage (Blog section updated)
styles.css                                ← stylesheet (new Blog tile styles)
blog/                                     ← NEW folder
  └── brief-history-of-time.html          ← NEW: first blog post
assets/blog/                              ← NEW folder
  ├── atomic-clock-1949.jpg               ← hero photo + 1949 entry
  ├── cosmic-bigbang.png                  ← Big Bang entry
  ├── sundial-a.png                       ← 3500 BCE
  ├── sundial-b.png                       ← 3500 BCE
  ├── babylonian-base60.png               ← 2000 BCE
  ├── yi-xing-su-song.png                 ← 725 CE
  ├── huygens-pendulum.png                ← 1656
  ├── greenwich-meridian.png              ← 1884
  ├── utc.png                             ← 1972
  └── clockchain-illustration.png         ← 2026 climax
```

## How to upload on GitHub.com

1. Open your repo on github.com.
2. **If your repo's homepage file is named `Clockchain 2026.html`** (or anything other than `index.html`), rename `index.html` in this package to match before uploading.
3. Upload the files:
   - **Repo root** → drop `index.html` (or renamed) and `styles.css`. These replace existing files.
   - **`assets/blog/`** → this is a new folder. The easiest way to create it on github.com is via *Add file → Create new file*, then type `assets/blog/atomic-clock-1949.jpg` into the filename — but that's awkward for binaries. **Simpler:** open the existing `assets/` folder, click *Add file → Upload files*, then drag the `assets/blog/` folder from this package directly into the page; GitHub will preserve the folder structure.
   - **`blog/`** → same approach at repo root. Use *Add file → Upload files* and drag the `blog/` folder in; GitHub will create the folder and place `brief-history-of-time.html` inside.
4. Commit with a message like *"Launch Blog: A Brief History of Time"*.
5. Wait ~1 minute for GitHub Pages to rebuild, then hard-refresh the live site (Cmd/Ctrl + Shift + R).

## Quick sanity check after upload

- Homepage → scroll to **Blog** section → you should see the new lead card with the atomic clock photo.
- Click the card → loads `blog/brief-history-of-time.html` with the full timeline article.
- Back arrow in the article's sticky top bar → returns to the homepage's Blog section.

## What you do NOT need to upload

`kinetic.js`, `tweaks.js`, `news-modal.js`, `earth-pins.js`, and all existing root-level assets (logo files, etc.) were not changed. Skip them.
