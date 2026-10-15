# English / Chinese / Spanish — shared English layout

Replaces the separately designed Chinese edition. English, Chinese (`/zh`) and Spanish (`/es`) now render the same `Site` component tree, assets, page sections, galleries, product/evidence interactions and contact form. A rendering adapter translates text/accessible labels without adding DOM wrappers. It does not change data values, filter values, event handlers, styles or identifiers. Internal navigation is locale-aware, including evidence filters and the original inquiry form. The compact language menu links to the equivalent page and preserves query/hash on click.

Translations are maintained in `lib/translations/catalog-*.json` (English key; Chinese and Spanish values). Published paper titles, summaries, limits, product copy, FAQs, company profiles and regulatory explanations are translated. Proper names, author names, journals, DOI, certificate identifiers, email addresses and original PDF/video/image content retain their source form. Preserved terms are explicit in `preserved-terms.json`.

SEO: three-language canonical/hreflang metadata, translated page metadata and structured data, server HTML language and 81 sitemap URLs. Existing audience and noindex/robots policy are unchanged.

Validation: `node scripts/check-seo.cjs`, `node scripts/check-locales.cjs`, TypeScript, production build. Locale checks compare tag/class structure across 27 original routes in each added language, verify core product/research/FAQ translation coverage, internal hrefs and form contract. Browser visual and interaction QA could not run because control-browser is unavailable; automated render checks do not establish browser interaction correctness.
