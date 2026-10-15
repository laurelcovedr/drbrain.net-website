# Content and privacy review — 2026-10-13

Baseline: latest main `15a4a7cc2e400e6601805bff64501cccaa5ab801` (SEO/GEO update). Existing open PR #1 restores video; this candidate does not depend on its unmerged changes.

| Area | Finding in main | Candidate treatment | Approval still required |
|---|---|---|---|
| Dr.Brain | Screening, imaging and rehabilitation combined; component-specific studies and limitations exist | Reuse short feature text and research summaries; omit reports, video and brochures | Version/indication mapping; screening versus diagnosis; marketed-version equivalence |
| RealNow | CT/vascular/perfusion modules; supplied comparative ASPECTS study reports modest results | Preserve study summary/limitations; omit regulatory badges and brochures | Which modules are available in each country; study numbers and intended use |
| AutismShield | VR/tablet developmental activities; no identified supplied product-specific efficacy studies | Preserve explicit independent-research boundary; omit concept illustration and registration files | Pediatric communications, tolerability and evidence review |
| ForcusGenius | Attention/executive-function activities; no identified supplied product-specific efficacy studies | Preserve ADHD diagnosis boundary and independent-research qualification | Intended use, pediatric claims and country/version availability |
| Clinical evidence | Summaries, citations, DOI and limits supplied by original project | Render text and DOI only; no full-text PDF distribution | Bibliographic and medical verification; full-text rights if later added |
| Company | General mission plus BP-derived leadership/advisor biographies | Use general company/mission text only; exclude all personnel profiles and affiliations | Final company copy; separate consent/current-role review for any later profiles |
| Registrations | 19 tracked PDFs plus scope-specific records; notification/clearance/conformity are mixed document categories | Exclude all original files and regulatory promotional claims | Per-document public permission, redacted derivative and current scope verification |
| Other resources | Sample reports, brochures, raw data, images and media | Exclude every original asset by construction | Rights, patient/privacy review and final public approval before later additions |

No approval, patient observation, efficacy conclusion or new registration status is inferred. Candidate content is ready for review, not approved medical advertising. Existing FAQ references to sample report formats and market documentation remain explanatory text only; no report/registration links or files are exposed. The candidate does not provide a new lead form or invent a public contact address.

## Validation performed

Local Node 24/Python tests: 7/7 passed. Built output: 11 pages, 11 Sitemap URLs, 16 visible FAQ answers. Checks cover exact file allowlist, excluded resource references, canonical/OpenGraph/schema origin, page headings, internal links, visible FAQ/schema equality, research summary/schema equality, Sitemap and llms consistency, review robots/noindex, release-mode approval gate, origin mismatch, private Site origin rejection, injected PDF rejection and FAQ mismatch rejection.

The release-mode test uses `https://example.com` inside a disposable fixture; it does not approve or deploy that domain. No full original framework build, binary PDF inspection, medical review, browser visual QA, public hosting, Search Console verification or indexing test is claimed. CI executes the same checks on the real repository checkout; its status must be checked separately.
