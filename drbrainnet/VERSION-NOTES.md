# Initial source backup — 2026-10-11

## Provenance and scope

Recovered actual source from the existing YIWEI MEDICAL Global Brain Science Site. Original source commit: `6045326fda9ebf2d1e31d5c09a532a9fc2989748`, saved version 24. Includes source, images, video, report PDFs, research PDFs, regulatory resources, package.json, pnpm-lock.yaml and original project README. Generated tsconfig.tsbuildinfo is omitted.

Source inspection confirms English positioning, four product lines, product-specific clinical evidence, English reports and SEO metadata/sitemap. Private noindex/nofollow and existing canonical origin remain unchanged.

Pattern scanning found no private-key blocks or common GitHub/OpenAI/AWS credential patterns in the imported files. This is a limited scan, not proof of absence of all sensitive content. Repository must remain private; report and regulatory resources are not cleared for public redistribution.

## Verification limits and missing production inputs

Build and browser behavior have not been revalidated during this backup. The SEO checker could not run before dependency installation because TypeScript was missing. A code backup does not include runtime secret values, production database contents, DNS settings or the current drbrain.net production host. Obtain those securely from the host administrator or original developer if a full production recovery is needed. Never commit secret values or database dumps.

## Modify and preview

1. Clone this private repository and enter `drbrainnet`.
2. Use Node >=22.13 and the exact package-manager version declared in package.json. Install dependencies with the committed lockfile (`pnpm install --frozen-lockfile`).
3. Create `feature/<change>` branches. Run `pnpm dev` for local preview, `node scripts/check-seo.cjs` for SEO verification, and `pnpm build` for build checks. Review the existing README for hosting-specific behavior.
4. Validate navigation, product/evidence associations, downloads, contact flow, responsive layout and SEO metadata before merge.
5. Use pull requests and compare changes against `baseline-v24-20261011`. Preserve restricted access. Local dev preview does not itself enforce production access policy.

## Rollback

The branch `baseline-v24-20261011` preserves the initial imported state. Do not update or delete it. Compare with `git diff baseline-v24-20261011 -- drbrainnet`.
Revert a faulty change with `git revert <commit>` through a reviewed pull request, rather than rewriting main. Git rollback alone does not redeploy the website. If an actual Site rollback is requested, use retained saved version 24 and its original deployment archive through the Site workflow. This import does not deploy, publish, or modify the current website.

## Large video recovery

GitHub connector requests are limited to 16 MiB. The original 18,756,580-byte video is backed up losslessly in two files under backup-assets, with its SHA-256 manifest. After cloning and before preview/build, run `python3 scripts/restore-backup-assets.py` from drbrainnet to restore public/media/quickmind-demonstration.mp4. This validates size and SHA-256 and will not overwrite a differing existing video. All other resources are stored at their original paths.

## Deliberately excluded sensitive resource

public/resources/registrations/vr-asd-brazil-icc.pdf is not included: visual inspection found a third-party signer personal identifier in the signature block. The original signed document is retained in the existing restricted Site source. Obtain a sanitized copy approved by the document owner before adding it to GitHub. This resource link will not resolve in a standalone clone until an approved replacement is supplied; the production Site is unchanged.
