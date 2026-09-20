# Working on Freedom Fire

- This folder IS the finished static website. Edit the top-level HTML files,
  `blog/*.html`, `css/site.css`, `js/site.js`, and `assets/` directly.
- Preserve plain HTML, CSS, and vanilla JavaScript. Do not introduce a build
  step, `dist/`, per-page folders, React, a CMS, or npm dependencies.
- Open `index.html` directly, or run `python3 scripts/serve.py` for the optional
  local preview. Edits take effect on refresh, with no rebuild.
- Run `python3 scripts/check_site.py` before handing off. It also checks that
  SHARED HEADER and SHARED FOOTER regions remain consistent across all pages.
  Update those regions together for site-wide changes, adjusting relative paths
  for `blog/` pages. Never load them via fetch; direct-file browsing must work.
- Use explicit relative `.html` links. Main pages live at the root, and the
  entire blog archive is one level deep in `blog/`.
- Preserve current content, original media, heading colors, and brand styling
  unless the user requests a change. Section palettes use `data-color-theme`.
- Fonts are locally hosted Figtree and Jost in `assets/fonts/`. Retain their
  license files; do not reintroduce Adobe/Typekit or other remote font requests.
- Check affected pages on desktop and mobile after layout changes. Grid
  positions are stored beside blocks as `--area` and `--mobile-area`.
- Volunteer and Contact Us forms post directly to the owner-provided Formspree
  endpoint. Each includes a hidden `contact-type` field (`Volunteer` or
  `Contact`) to identify the source. Never claim delivery without a configured
  service.
- If renaming a page, update links, canonical/social metadata, docs/page-map.json,
  and the matching embedded compatibility map in 404.html. See docs/MAINTENANCE.md.
- Work remains local. Do not push, deploy, change DNS, or alter payment
  destinations without authorization.
