# Fix — Blog article links

## What's in this package

```
blog/brief-history-of-time.html    ← REPLACES the existing file
```

## What changed

All 5 internal links inside the blog article (Back to blog, logo, "Read about the solution" CTA, "What is Clockchain?", "Latest press releases") now point to `../index.html` instead of `../Clockchain 2026.html`.

This fixes the bug where clicking "Back to blog" loaded a stale older copy of the homepage that didn't have the Blog section.

## How to upload

1. Open your repo's `blog/` folder on github.com.
2. *Add file → Upload files*.
3. Drag this `brief-history-of-time.html` in (it replaces the existing one).
4. Commit.

## Also recommended (one-time cleanup)

Delete the stale duplicate files at your repo root — they aren't being served and only cause confusion:

- `Clockchain 2026.html`
- `Clockchain 2026 - Gold Palette.html`
- `Clockchain 2026 - Pre-News-Redesign.html`
- `Clockchain 2026 - Standalone Source.html`
- `Clockchain 2026 - Standalone.html`

For each: click the filename → trash-can icon (top right) → commit. Your live site is served from `index.html` and doesn't reference any of those.
