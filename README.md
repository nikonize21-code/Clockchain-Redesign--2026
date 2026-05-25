# Fix — Permanent solution for back-link 404

## What's in this package

```
index.html                          ← homepage (no renaming needed anymore)
blog/brief-history-of-time.html     ← article with corrected back-links
```

## Background

The repo had two HTML files that drifted out of sync:
- `index.html` (the file GitHub Pages actually serves)
- `Clockchain 2026.html` (a stale copy from older uploads)

The article's "Back to blog" link pointed to `Clockchain 2026.html`. When that file went stale or got deleted, the back-link 404'd.

From now on, **there is only one canonical homepage file: `index.html`**. The article links directly to it, so no renaming on upload is needed.

## How to upload

1. **`index.html`** → drag into the repo root. Replaces the existing `index.html`.
2. **`blog/brief-history-of-time.html`** → open the `blog/` folder, drag in. Replaces the existing article.
3. Commit. Wait ~1 minute, hard-refresh the live site.

## Clean up (one-time, recommended)

If you haven't already, delete these stale files from the repo root — they aren't being served and only cause confusion:

- `Clockchain 2026.html`
- `Clockchain 2026 - Gold Palette.html`
- `Clockchain 2026 - Pre-News-Redesign.html`
- `Clockchain 2026 - Standalone Source.html`
- `Clockchain 2026 - Standalone.html`

For each: click the filename in your repo → trash-can icon (top right) → commit.

## Verify the fix

After uploading and refreshing:

1. Visit live site → Blog section visible ✓
2. Click into "A brief history of time" → article loads ✓
3. Click "← Back to blog" in the top bar → returns to homepage with Blog section visible ✓
4. Click the Clockchain logo in the article's top bar → returns to homepage ✓

If any of those steps fail, send me a screenshot and I'll dig in.
