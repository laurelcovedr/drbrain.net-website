# YIWEI MEDICAL isolated public candidate

This is an independently built static visual candidate derived from main commit `15a4a7cc2e400e6601805bff64501cccaa5ab801`. A separate owner-private visual review is hosted at https://yiwei-candidate-review.lawrence-wan-0405.chatgpt.site. Public release is not approved. The original `drbrainnet/` project, private ChatGPT Site, production domain and repository visibility are unchanged.

## Build and verify

From repository root, with Node 24 and Python 3:

```sh
node public-candidate/build.mjs
python public-candidate/validate.py
python public-candidate/test.py
python -m http.server 8080 --directory public-candidate/dist
```

Candidate output is exclusively `public-candidate/dist/`. Only this directory is eligible for a later deployment. Never deploy the repository root or copy `drbrainnet/public/` into it. Configure the static host to map clean routes to their `index.html`, and return HTTP 404 for unknown routes. Serve `404.html` with a real 404 status. No deployment action exists in the CI workflow.

## Independent SEO configuration

`config.json` defaults to review mode with `https://public-candidate.invalid`, noindex/nofollow and disallow-all robots. This is an offline review placeholder, not an approved or live domain. Review mode must remain access restricted if someone subsequently hosts it: noindex and robots are not access controls.

After documented approval, set the exact HTTPS production origin in both `origin` and `approvedOrigin`; set `medicalContentApproved` and `companyContentApproved` to true; set `mode` to `release`; rebuild and validate. These fields record a decision made outside the code; editing a boolean does not constitute legal or medical approval. Release mode consistently changes canonical, OpenGraph URL, schema IDs, robots, Sitemap and llms links to the configured origin and enables index/follow. Original Site configuration is never read or modified.

11 routes: home, company, aggregate evidence, four product pages and four corresponding evidence pages. Original aliases, reports, registrations, global partners, care-setting and technology pages are intentionally outside this reduced candidate. All internal navigation points only to included routes. 16 FAQ answers remain visible and match JSON-LD. DOI links replace downloadable research files; articles without supplied DOI retain citations and explicit verification notes. llms.txt is a supplemental index, not a ranking guarantee.

## Resource boundary

No images, PDFs, videos, fonts, sample reports, BP materials, raw JSON reports, source manifests, personnel profiles, institutional logos, patient records or registration files are copied. Generated CSS is the only asset file. Original inline SVG illustrates an abstract neural network and is explicitly labeled as a concept; it contains no external references. `excluded-assets.json` records every original public asset and its exclusion. All 19 tracked registration PDFs remain in the original private source only. Their contents have not been visually inspected or redacted in this task; exclusion avoids treating private-repository upload authorization as public-release authorization.

Public resource approval is default-deny. To add any asset later, create a public derivative outside the original directory, document permission and redaction, and explicitly extend the builder and exact-output validator. Never weaken the output check to accept arbitrary files.

## Required public-release approvals

1. **Domain and operations:** exact canonical origin, ownership/DNS, HTTPS host, redirects, clean-route support, 404 status, approved contact channel and jurisdiction-specific legal/privacy information. Public deployment is a separate decision.
2. **Medical communications:** intended use and version of each marketed component, country-specific availability, terminology and efficacy boundaries; reviewer/date recorded for final copy. AutismShield and ForcusGenius independent research must not become product-specific efficacy claims. Screening must not become diagnosis. Research-stage MRI-to-PET must not become an available product claim.
3. **Bibliography:** source-paper checks of author/title/DOI, numeric findings, sample sizes and limitations. Existing source summaries are reused, not independently validated in this task. Claims without product-version equivalence remain limited.
4. **Company:** approve general company/mission text. Names, biographies, advisor roles, portraits, institutions, hospital/customer lists and partner endorsements are excluded pending consent and current-role checks.
5. **Registrations:** approve each public derivative separately, including removal of signatures and personal/contact data; verify issuer, current validity, product/version, market and precise scope. FDA clearance, device registration, notification/listing and electrical-safety conformity are distinct. No regulatory badges or blanket global approval claims are included. All 19 originals remain excluded until approved derivatives exist.

After deployment is separately approved: verify live HTTP status and headers, domain redirects, canonical and robots responses, submit the Sitemap and verify domain ownership in Search Console, then request indexing and observe results. Static checks cannot prove Google indexing or traffic. See VISUAL_REVIEW.md for browser QA evidence and current limitations. Public deployment/indexing acceptance remains outstanding.


## Visual review and browser QA

The visual design is a stacked change based on PR #2 head `56a4b545ab55dfefe1e0074c1088b071da7d8014`. It preserves the eleven routes, all supplied feature text, study summaries/limitations, and 16 FAQ answers. Native HTML details/summary powers menus and FAQ without executable JavaScript. Responsive CSS uses only system fonts; no remote fonts, libraries, imagery or source assets are requested.

```sh
npm ci --prefix public-candidate --ignore-scripts
npx --prefix public-candidate playwright install --with-deps chromium
npm run test:browser --prefix public-candidate
```

The browser script owns a temporary loopback server serving only `dist`. It checks 11 pages at 360, 390, 768, 1024 and 1440 px, native menu keyboard navigation, product and evidence links, all FAQ open/close actions and answer/schema equality, reference destinations, 404s, noindex, unexpected external requests and overflow. It records 20 full-page screenshots plus a mobile FAQ screenshot in `browser-results/`. CI retains only these isolated candidate outputs for 14 days inside the private repository. There is no deployment action or upload of the source repository, original assets or `drbrainnet/public`.

Private preview is owner-only; colleagues require an independently authorized access change. Noindex is additional SEO isolation, not access protection. The private host is separate from the original Site and official domain. Candidate canonical/schema/Sitemap origins intentionally remain `.invalid` in review mode.
