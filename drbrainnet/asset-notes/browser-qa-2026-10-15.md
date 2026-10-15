# Desktop browser visual acceptance — 2026-10-15

Tested the deployed Site in the cloud Chrome browser at a measured 1363 × 936 CSS-pixel viewport. Actual browser page observations covered all 81 canonical pages: 27 English, 27 Chinese and 27 Spanish. The older implementation-only render checks are reported separately.

## Observed results

- All 81 pages produced their primary heading; no page-level horizontal overflow or completed-but-failed first-viewport images were observed. Lazy images were not classified as broken before loading.
- Manually inspected screenshots of English, Chinese and Spanish homepages; Spanish product hero, FAQ anchor, contact form and study dialog. Original layout and imagery are retained.
- Clicked English → Chinese → Spanish language switching, the Chinese perfusion tab, Spanish contact-purpose tabs and product selection, product FAQ anchor, research dialog, report next-page control and report-page selector.
- Browser extension metadata errors originated from `chrome-extension://`; they were not attributed to the Site.

## Bugs found and corrected

1. Localized evidence search matched only the original English fields. Search now indexes original and translated titles/metadata, supports Chinese and Spanish, and ignores Spanish accent marks.
2. Contact tabs had a 2px vertical overflow caused by the underline, exposing a vertical scrollbar. Vertical overflow is now hidden while horizontal tab scrolling remains enabled.
3. Accessible names on Radix tab lists and select triggers remained English. They now use the selected language.
4. Study-dialog metric labels and the close label, plus the report-page separator, had untranslated text. Added their Chinese/Spanish translations.

## Limits

This is a desktop-browser acceptance run. The available browser API does not expose viewport resizing or device emulation, so 360/375/768px mobile/tablet browser acceptance remains pending. No test email was sent, no real inquiry delivery was asserted, and source PDFs/videos/image-embedded text retain their original language.

Verification commands: `node scripts/check-evidence-search.cjs`, `node scripts/check-locales.cjs`, `node scripts/check-seo.cjs`, TypeScript and production build. Post-deployment browser retest evidence is recorded alongside this report.

## Post-deployment retest — Site v28

All 81 canonical pages were revisited after deployment: primary headings present, document languages correct, no page-level horizontal overflow or completed failed first-viewport images observed. Spanish `demencia` returned 2 research articles; Chinese `痴呆` returned 3. The translated select labels, Spanish study metrics and `Cerrar` close control were verified in the browser; the dialog closed successfully. The contact purpose switched to `Alianzas`, the product selection displayed `AutismShield™`, and the tab list had `overflow-y: hidden`, eliminating the 2px vertical scrollbar.

The report-page next button and selector worked in the initial run (page 1 → 2 → 7). Language switching, Chinese perfusion tab and Spanish FAQ anchor also passed targeted manual interaction checks. No form was submitted.

### Browser evidence

- [81-page initial observation record](browser-qa-2026-10-15/pages-before.json)
- [81-page post-deploy record](browser-qa-2026-10-15/pages-after.json)
- [Chinese homepage](browser-qa-2026-10-15/zh-home.jpg)
- [Spanish homepage](browser-qa-2026-10-15/es-home.jpg)
- [Spanish product hero](browser-qa-2026-10-15/es-product.jpg)
- [Spanish search after fix](browser-qa-2026-10-15/es-search-fixed.jpg)
- [Spanish contact form after fix](browser-qa-2026-10-15/es-contact-fixed.jpg)
- [Spanish study dialog after fix](browser-qa-2026-10-15/es-study-dialog-fixed.jpg)

Mobile/tablet browser acceptance is explicitly pending; the desktop pass must not be interpreted as a mobile pass.
