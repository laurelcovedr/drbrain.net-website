# Visual review — 15 October 2026

Base: PR #2, commit `56a4b545ab55dfefe1e0074c1088b071da7d8014`.

Owner-private preview: https://yiwei-candidate-review.lawrence-wan-0405.chatgpt.site

## Design changes

- Deep navy/sea-green palette, system typography, original inline SVG neural-network concept illustration.
- Clear product navigation on every page, dedicated evidence navigation, linked product cards and product-to-evidence calls to action.
- Native keyboard-operable details menus and FAQ with visible focus styling and a skip link.
- Responsive stacked mobile composition, restrained editorial research layout, separate highlighted limitations, wrapping DOI links.
- Research text, authors, citations, limitations and product feature text are carried over from PR #2. No independent medical/bibliographic validation is claimed.
- Existing source files, private Site, production domain, excluded asset inventory and candidate SEO config remain unchanged. Output remains exactly 11 HTML routes plus the same five supporting files. No executable scripts or external resources.

## Actual findings and treatment

| Finding | Treatment | Verification |
|---|---|---|
| PR #2 header lacked direct product navigation | Desktop solution menu and mobile menu expose all four solutions on every page | Static route checks passed; browser run pending |
| Long research pages had weak hierarchy | Journal/year rail, readable main column and separate limitations panel | Browser screenshots pending |
| Static FAQ text made product pages long | Native expandable FAQ, original answer text retained | 16 visible-text/schema checks passed; browser run pending |
| Managed preview could not start | Infrastructure returned `bwrap: Can't mount proc on /newroot/proc: Operation not permitted`; supervisor reports stopped | No substitute managed server was started |
| Local Chromium unavailable | Both browser and headless-shell downloads returned invalid/truncated ZIPs | Local Playwright launch could not complete |

## Evidence status

- Build and exact output/SEO/schema validation: passed, 11 pages / 16 FAQ / 11 Sitemap entries.
- Original policy and negative tests: 7/7 passed locally.
- Local browser QA: blocked by missing Chromium and managed preview infrastructure; no local screenshots or visual pass claimed.
- GitHub Actions browser QA: configured in this PR; results and screenshots must be read from the run before claiming success.
- Private deployment: Sites returned `succeeded`, version `appgprj_6ad05e52a33881919935775494a8ce11~appgver_a397758decf0819197ec55a339db2dac`. Publication used only the validated isolated `dist` and a separate hosting manifest. Owner-only access enforced by the private deployment operation. Hosted visual, redirects, HTTP security headers and unknown-route behavior have not been independently checked.
- External DOI resolvability, current bibliography, medical claim validation, real phones/WeChat and public-release approval remain outside this design QA.

Run reproducibly with the README commands. `browser-results/results.json` contains per-route and viewport outcomes, and screenshots are retained in the private Actions artifact for 14 days; these are never added to deployed output.
