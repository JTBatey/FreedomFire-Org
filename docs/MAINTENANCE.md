# Notes for website maintainers

The directly editable HTML files at the project root and in `blog/` are the only
page copies. Ordinary text edits require only saving and refreshing the browser.

## Shared layout

Each page is a complete document. Marked SHARED HEADER / SHARED FOOTER regions
should match, except for the extra `../` needed by blog pages. The optional
checker compares these regions to prevent site-wide changes from missing a page.

## Assets

Photos/logos are in `assets/images/`; PDFs and Word files are in `assets/documents/`.
The chosen Figtree and Jost fonts and their licenses are in `assets/fonts/`;
these are loaded locally, not from a third-party font service.
Videos remain external embeds, so there is no empty video folder. Update
`asset-sources.json` when renaming or removing a recorded asset.

## Old public URLs

`page-map.json` maps the previous routes to the new files. `legacy-queries.json`
records four original archive-pagination query URLs. The local preview server
redirects these old routes. Website navigation uses the new relative HTML links.
Because the blog index still exists at `/blog/`, `js/site.js` also handles those
four query-string bookmarks without waiting for a missing-page response.

GitHub Pages supports [a custom 404 page](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site).
The included `404.html` handles missing routes. It
contains the same maps and uses JavaScript to direct visitors to matching new
pages, preserving query parameters and anchors. It supports both a custom domain
and a repository URL prefix. Unknown addresses show a helpful message; the
fallback homepage link assumes the planned domain-root hosting.

**This is not an HTTP 301 redirect.** The initial response remains a 404, so this
is a bookmark convenience, not a search-engine-equivalent URL migration. Before
changing DNS, test old links on the chosen host and decide whether true permanent
redirects warrant a redirect-capable hosting/edge service. Do not recreate a
directory per page without the owner's approval.

The custom 404 is not invoked for missing files opened from disk. Direct-file
browsing uses the new explicit HTML links and needs no redirects.

## Validation

Run `python3 scripts/check_site.py`. It checks links, assets, duplicate IDs,
shared layout, asset-source records, and the compatibility maps, without editing.
The optional server listens only on `127.0.0.1:8000` and never generates files.
Before launch, review `REVIEW.md`. Nothing has been published or pushed.
