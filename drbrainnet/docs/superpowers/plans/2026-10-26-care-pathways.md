# Care pathways implementation plan

Goal: implement the three structure improvements approved in conversation, preserving the visual system and identical EN/ZH/ES components.

Architecture: reuse existing care-settings, products and evidence pages; no route migrations. A validated contact query carries product, setting and demo intent into the existing email enquiry. No new backend or booking confirmation.

1. Move existing care-settings before the portfolio; prioritize it in navigation. Add related setting links on products, research links on setting panels, and contextual demo links.
2. Add a shared contact-link/query contract. Contact hydrates recognized values only, exposes editable setting and includes it in the draft. Invalid parameters fall back safely. Header and primary sales CTAs use Request a demo.
3. Add translations to the existing dictionary, preserving shared DOM. Verify locale, evidence search, SEO, TypeScript, contact context and build; browser-check published paths if available.
4. Publish to the existing public Site and synchronize changed files to the authorized GitHub repository.

Review focus: invalid query values; localized query links; product/setting associations; no automatic email sends; translations and narrow-width wrapping.
