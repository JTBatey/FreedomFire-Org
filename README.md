# Freedom Fire website

**Start here:** double-click `index.html` to open the website in your browser.
This folder is the website. There is no separate source copy, generated copy,
build step, package manager, or Squarespace dependency.

## Where things live

| What you want to change | Where to look |
| --- | --- |
| Homepage | `index.html` |
| A main page | Its named `.html` file here, such as `staff.html` or `volunteer.html` |
| A blog post or archive | `blog/` |
| Photos and logos | `assets/images/` |
| Locally hosted fonts and licenses | `assets/fonts/` |
| Downloadable PDFs and Word files | `assets/documents/` |
| Colors, fonts, and layout | `css/site.css` |
| Menus and galleries | `js/site.js` |

## Make a change

1. Open the relevant HTML file in a plain-text/code editor, or ask your AI coding
   assistant to edit it. Do not use Word to edit HTML.
2. Find the text you want to change, edit it, and save.
3. Refresh that page in your browser. **No rebuild is necessary.**

Keep the folders together when copying the site. Images and page links are
relative, so the site also works when opened directly from disk.
Fonts are stored locally and need no subscription or internet connection.
Videos and external links still need internet access.

Replacing a photograph with another file of the same name updates all pages
that use it. If its shape or dimensions change, ask your coding assistant to
update the image dimensions/crop too. Keep a backup before making changes.

The navigation and footer are repeated in each complete page so direct-file
browsing works. For a site-wide change, ask your coding assistant to update
the marked **SHARED HEADER** or **SHARED FOOTER** on every page consistently.

## Optional preview server

For video embeds or testing closer to a hosted website, double-click
`Start Preview.command`, then open <http://127.0.0.1:8000> in any browser.
Keep its terminal open; Control-C stops it. This serves these same files directly.

## For maintainers

- `scripts/` contains only optional preview and checking tools. Run
  `python3 scripts/check_site.py` to check links, assets, and shared navigation.
- `docs/` contains migration records, the old-to-new page map, and review notes.
- `404.html` helps old public bookmarks find renamed pages on GitHub Pages.
  It uses a browser-side redirect, not a server-side 301; see `docs/MAINTENANCE.md`.
- `AGENTS.md` gives coding assistants project-specific instructions.

## Before publishing

Everything is still local. When approved, upload this folder's website files
and asset folders as the site root—there is no `dist` folder to build or upload.
Include `404.html` and the hidden `.nojekyll` file. Maintenance files can stay in
the repository but are not needed to display the site.

Volunteer and Contact Us both use Formspree. The private homepage video still
needs review. Typography now uses locally
hosted, open-source Figtree and Jost; Adobe font hosting is no longer needed.
See `docs/REVIEW.md` for the launch checklist. No GitHub or DNS changes were made.
