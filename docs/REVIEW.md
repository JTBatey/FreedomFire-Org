# Version 1 review — September 18, 2026

The replica is local only. No GitHub push, public deployment, payment, message,
Squarespace account change, or DNS change was performed.

## Migrated

- 24 main pages, including staff, ministries, network, locations, videos,
  volunteering, contact, donation, and older event pages.
- 56 individual blog posts, 34 initial blog/category/tag listing pages, and
  4 additional pagination pages: 118 directly editable pages in total.
- 119 HTML files including the old-link/not-found helper `404.html`.
- 169 original local assets: photographs, logos, favicon, donation-button image,
  and linked PDF/Word documents. All downloads completed successfully.
- Shared page shell, navigation and footer; plain CSS and JavaScript.

## Verified

- Website pages: every relative image, script, stylesheet, document and page
  reference resolves locally. No duplicate HTML ids were found.
- JavaScript syntax check passed.
- All 24 main pages checked at desktop width 1280 and phone width 390. No
  horizontal overflow or overflowing content blocks was detected in those
  checks. Representative archive pages were checked on desktop too.
- Compared the homepage at matching desktop/phone sizes against the public
  original: logo placement, headline wrapping, hero crop, section sizes and
  curves. Compared outreach image cropping and page spacing on desktop.
- Mobile navigation opens, exposes submenus, and navigates to the selected page.
- Contact required-field validation blocks an empty submission. Valid test input
  creates an explicit, correctly addressed email-draft link; nothing was sent.
- The volunteer form accepts a phone number in its “EMAIL OR PHONE” field.
- Gallery images open in a modal and close with focus returning to the thumbnail.
- Archive pagination exposes older/newer posts locally, including the third blog
  page. Image dimensions are included in the HTML to prevent layout jumps while
  lazy-loading archive photographs.
- The original PayPal hosted-button destination and button id were retained.
  No donation was submitted, and payment completion was not tested.

## Items for owner review before launch

1. **Forms:** Squarespace form delivery cannot operate from GitHub Pages as-is.
   This version uses clearly labeled email drafts. Decide whether to keep that
   approach or connect a dedicated form submission service before publication.
2. **Private video:** the new homepage Vimeo video, `1216484093`, asks viewers to
   sign in on the original site too. Its original embed and privacy hash are
   preserved. Review its Vimeo visibility/embed settings if it should be public.
3. **Fonts — resolved:** with the owner's approval, Proxima Nova and Futura PT
   have been replaced by locally hosted Figtree and Jost. Their complete SIL
   Open Font Licenses are included in `assets/fonts/`. No Adobe/Typekit requests,
   paid font-hosting subscription, or internet connection for fonts is needed.
4. **Visual acceptance:** the main visual layout has been reproduced closely;
   this is not a pixel-perfect certification of every page or historic blog
   entry. Review imagery, text spacing, older galleries and long staff bios at
   your preferred device sizes before calling version 1 approved.
   Social metadata is prepared for the eventual `www.freedomfire.org` domain;
   social cards cannot resolve to this local-only preview from outside your Mac.
5. **Historical content:** old posts, dates, literal legacy embed shortcodes and
   already-empty entries were preserved from the public source. Live external
   partner links and historic video availability may have changed independently.

## Repairs made during migration

- Audited heading colors against the live original on all 24 main pages.
  Restored 53 burgundy level-two headings using the original computed color
  `rgba(143, 0, 2, 0.89)`. Preserved intentionally gray page titles and white
  headings on colored backgrounds; matched staff-role and blog-heading grays.
  Section palettes are now explicit `data-color-theme` attributes in source HTML.
  Browser comparison found no remaining main-page heading-color mismatches.
- Repointed the obsolete internal `/maps/` staff link to the existing locations
  page.
- Corrected a malformed BidPal link and a missing scheme on an old ACCKC link.
- Removed duplicate gallery images that existed as duplicate rendering variants
  in the Squarespace source.
- Kept all original payment destinations; removed the PayPal tracking pixel.
- Omitted Squarespace analytics, editor/runtime code and backend form scripts.

## Remaining hosting work

Publish only when approved. The project root is now the website; no build step,
`dist` folder, Node, or Python runtime is needed on the host. Choose the
repository/Pages setup, configure the intended public URL and domain, and then
make the DNS change separately. Old-link compatibility uses a custom 404 with
browser-side navigation, not HTTP 301 redirects; review the implications in
`MAINTENANCE.md` before launch.

## Simplified project structure

- Main HTML pages are at the project root; all blog pages are in `blog/`.
- Images are in `assets/images/`; downloads are in `assets/documents/`.
- Retired the duplicate source/output layout and one-time import/build scripts.
  A verified complete pre-change backup is saved beside the project:
  `../FreedomFire-before-simplification-20260918-144146.zip`.
- All pages can be edited directly. Shared header/footer regions are marked,
  and the optional checker detects inconsistencies between pages.
- Renamed routes are recorded in `page-map.json`; archive query routes are in
  `legacy-queries.json`. No publishing or DNS changes were made.
- Compared all 118 pages and 169 assets with the pre-change backup: page text
  and asset bytes are unchanged. CSS changes are whitespace-only.
- All 119 HTML files pass link, asset, shared-layout, and compatibility-map
  checks. The compatibility resolver passed 712 old-URL test cases, including
  repository prefixes and the original archive-pagination query URLs.

## Approved local font replacement

- Figtree replaces Proxima Nova throughout body text, headings, navigation,
  and form fields; Jost replaces Futura PT on styled buttons.
- Fonts and their full licenses are in `assets/fonts/`. Removed all Adobe font
  requests, including from the retained comparison page. The website typography
  no longer depends on Squarespace, Adobe, Google CDN, or a font subscription.
- Increased level-two heading line height slightly to accommodate Figtree's
  vertical metrics. Brand colors, logo images, and page content are unchanged.
- Checked all 24 main pages at 1280px desktop and 390px phone widths. Neither
  horizontal overflow nor overflowing text blocks remained in those checks.
- Constrained fixed-width legacy blog object/embed elements to their container
  width after checking archive pages on mobile. Historic video availability
  remains unchanged; replacing old video formats is outside this font update.
- Formspree is now configured for the Volunteer and Contact Us forms; details
  are documented below.

## Volunteer form — Formspree

- The volunteer form now posts directly to the owner-provided Formspree endpoint
  `https://formspree.io/f/xoevvrlo`. Its field names are clear (`name`,
  `email_or_phone`, `email_list_signup`, `address`, and `message`)
  and its subject is set to “Freedom Fire volunteer inquiry.” The optional,
  initially unchecked email opt-in matches the original wording: “Sign up for
  news and updates.” Its `email_list_signup` field is always included: `Yes`
  when selected and `No` otherwise.
- Native required-field validation remains enabled. The form is deliberately a
  standard HTML POST: it works from local-file review and GitHub Pages without
  a framework or custom JavaScript. Formspree controls its confirmation/error
  response after a real submission.
- No test submission was made, so no message was sent to the charity. The
  Contact Us form uses the same endpoint, with an independent hidden source
  value as documented below.

## Contact form — Formspree

- The Contact Us form now posts to the same owner-provided Formspree endpoint.
  It retains its existing Name, Phone, Email, Address, and Message questions,
  with clear lowercase field names for the submission.
- Both Formspree forms include the hidden field `contact-type`: Volunteer sends
  `Volunteer`; Contact Us sends `Contact`. Both also have their own clear email
  subject fields. No submission was made while testing.
