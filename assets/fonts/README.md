# Website fonts

- **Figtree** (weights 300–900): body text, headings, navigation, and forms.
- **Jost** (weights 100–900, using 800 for buttons): styled buttons.

Both are unmodified variable TrueType fonts downloaded from the official
Google Fonts repository on September 18, 2026:

- https://github.com/google/fonts/tree/main/ofl/figtree
- https://github.com/google/fonts/tree/main/ofl/jost

Their SIL Open Font License 1.1 copyright/license notices are included beside
the files. Keep those notices when copying or publishing the website.

`css/site.css` loads these files using relative paths, so they also work when
opening `index.html` directly from disk. No Adobe, Google CDN, subscription,
API key, package manager, or font installation is needed. The two font files
total approximately 193 KiB and cover all of the weights used by the site.

These replace Proxima Nova and Futura PT with the owner's approval. They are
similar alternatives, not metric-identical copies. The logo remains an image.
