# Technology layout and brochure imagery

Scope: EN/ZH/ES technology overview and three detail pages. Preserve existing branding, translation structure and clinical wording.

Design: existing navy #081b2c, blue #075abe, white #ffffff, pale blue #edf3f9, border #d6e2ed. Inherited site font; headings 24–64px, body 16px. Overview uses three equal desktop image/content cards, 28px body padding, aligned bottom links; horizontal cards below 950px and single-column cards below 650px. Detail pages retain two-column hero and consistent contained images; galleries 3/2/1 columns. No added animation.

Inspected user-supplied 1012 Brain Renew.pdf page 5: QuickMind mobile clinical unit. The corresponding existing brochure-mobile-clinical-unit asset is reused in the digital rehabilitation gallery together with clinic, home and training visuals. Existing supplied device photos replace eye-tracking hero/gallery and overview thumbnails. These are brochure illustrations, not proof of eye-tracking hardware specification or clinical efficacy; retained scope notices apply. No new clinical claims or PDF download added.

Fixed overview negative image margins conflicting with zero article padding; added image/svg sizing and contained media. Preserved semantic headings, links, alt text, native modal keyboard support and shared three-language layout. Guidelines retrieved from vercel-labs/web-interface-guidelines main/command.md on 2026-10-29.

Checks: translation parity passed (54 pages, zero untranslated), TypeScript passed, production build passed. Managed preview start failed due to an existing vinext server in preview infrastructure; deployed-browser QA follows. Mobile/tablet browser viewport controls unavailable; CSS breakpoints reviewed, no physical device validation.

Published V40. Deployed desktop checks: 12 routes (3 locales × overview + 3 details), no horizontal overflow or completed failed images at observation. Overview 3 image cards loaded; digital rehabilitation 5-image gallery, mobile clinical unit modal with translated provenance, Escape close verified. Screenshot inspected for overview and modal. Lazy images not all forced into viewport on every locale. Source c9f53e42dc54bf5a72dcf7e3b56d2ac7b95b31ab; deployment appgdep_6ae2f0d9762c8191b1eaff1c0e3afbf1 succeeded.
