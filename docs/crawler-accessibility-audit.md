# Crawler accessibility audit — September 25, 2026

## Findings before changes

The site is a React 18 / TypeScript single-page application built with Vite 5,
React Router 6 (`BrowserRouter`), MUI 5, Emotion, and SCSS. The browser calls
`createRoot`; there was no server or static rendering. GitHub Actions builds
`dist`, syncs it to Amazon S3, and invalidates CloudFront. No middleware,
authentication, user-agent routing, WAF rules, or CloudFront infrastructure
configuration is defined in this repository.

Direct HTTPS GET of `/shopcost-privacy` returned **200**, `Content-Type: text/html`,
1,404 bytes, `Server: AmazonS3`, and `X-Cache: Error from cloudfront`. It contained
`<div id="root"></div>`, scripts, a generic title/description, and a JavaScript
required notice. It contained **none of the privacy policy**. Responses for curl,
Googlebot, a browser user-agent, and `/` had identical SHA-256 hashes:
`92ed94bf944b95b7731d356aea8a4a9ae80caf7d16d54656847d77a9e1ca883e`.

HTTP redirected to HTTPS with **301** and the same path. HTTPS itself did not
redirect. `/about`, `/shopcost-support`, `/shopcost-privacy/`, `/sitemap.xml`, and
an intentionally nonexistent path returned the same 200 shell in header probes.
The deployment only produced `index.html` for React routes. Together these facts
strongly indicate an S3 missing-object response being mapped to `/index.html`
with status 200 by CloudFront's custom error handling. The exact origin error
(403 versus 404) and distribution configuration cannot be established without
AWS configuration access.

A separate probe of the `www.timothyhatch.com` variant timed out; its DNS/TLS or
redirect configuration was not established. All canonical URLs intentionally use
the working apex hostname supplied for this audit.

The external reader also reported the URL inaccessible, and the supplied
`site:` search returned no results. Those observations do not establish the
reader's internal failure reason or conclusively establish Google index status.
The empty initial HTML is a confirmed accessibility defect for readers that do
not execute JavaScript; the missing route objects and soft-404 behavior are a
separate hosting concern. JavaScript-capable search crawlers may render an SPA,
but indexing is not guaranteed.

`/robots.txt` returned 200 text/plain and allowed every user-agent with an empty
`Disallow`. There were no meta robots directives or `X-Robots-Tag` headers in the
inspected responses. No canonical link existed. `/sitemap.xml` was not a sitemap:
it returned the SPA shell. No bot challenge, login, cookie requirement, or
user-agent difference was observed in the tested requests. Hidden WAF/CDN rules
and access from other networks remain unverified; no security relaxation is
justified by these findings.

All five React routes had the same rendering limitation: `/`, `/about`,
`/projects`, `/shopcost-support`, and `/shopcost-privacy`. The separate public game
HTML files and PDF downloads are static assets; playing the games and using the
PDF viewer still require JavaScript.

## Implemented fix

Use Vite and React's existing build-time rendering capabilities, without adding
dependencies, a framework migration, runtime SSR, or an external prerender service.
An explicit five-page public allowlist drives static output, sitemap, and metadata.
The same React components render for everyone. No crawler/user-agent branching or
private-route discovery is used. Existing SCSS and the policy component are unchanged.

Each non-root route is emitted as an **extensionless file matching its S3 object
key**, so `/shopcost-privacy` can succeed at the origin without an SPA fallback,
rewrite, or trailing-slash redirect. The deployment workflow explicitly uploads
these objects as `text/html; charset=utf-8`, then invalidates `/*` as before.
The root remains `index.html`. Route-specific titles, descriptions, canonical
links, and a sitemap are generated. Metadata also follows client-side navigation.
Robots continues allowing all crawlers and now advertises the sitemap.

The existing React app mounts normally after JavaScript loads. The header title
is computed synchronously so the initial HTML identifies the correct page.
The About PDF canvas viewer is lazy loaded in the browser; its download link and
all About prose remain in initial HTML. Server-generated MUI styles cover the
static content. No styles or policy wording were edited. Static HTML starts with
the default light theme; the existing browser media query applies the visitor's
color preference when React mounts.

## Changed files

- `package.json`: build-time render step, exact-object preview, HTTP checks.
- `scripts/prerender.mjs`: temporary Vite SSR build, static page and sitemap output.
- `scripts/serve.mjs`: local static preview, HTML MIME handling, missing-file 404.
- `scripts/check-public-pages.mjs`: direct HTTP/content/policy/asset regression checks.
- `src/publicPages.ts`: explicit public paths and metadata.
- `src/entry-prerender.tsx`: render existing App through StaticRouter at build time.
- `src/App.tsx`: synchronous header title and navigation-aware document metadata.
- `src/index.tsx`: explanatory comment; existing client mounting behavior retained.
- `src/components/about/about.tsx`: browser-only lazy PDF viewer.
- `public/robots.txt`: sitemap declaration only.
- `.github/workflows/main.yml`: regression/type checks and explicit HTML S3 uploads.
- `README.md`: build, preview, verification, and deployment instructions.
- `docs/crawler-accessibility-audit.md`: this audit.

Generated `dist` files were rebuilt. The original privacy component SHA-256
remains `734c35dd26b364469975e85c30e41a1bf97cd2d5d4eb831e579bcb9fea31ccec`.
No Git commands or deployment commands were run.

## Verification

- `npm run build`: passes. Existing ts-node loader/deprecation and PDF.js eval
  warnings remain; they do not prevent the build.
- `npx tsc --noEmit`: passes.
- `npm run check:public-pages`: passes against a real local HTTP server serving
  built objects without SPA fallback. All five GET/HEAD routes return 200 HTML
  with substantive initial content, correct canonical links, and no noindex,
  nofollow, or X-Robots-Tag restriction. Sitemap and robots checks pass.
- Every policy heading/paragraph is compared with the original JSX source, in
  order, with whitespace normalized. Contact email/link is verified separately.
  The original source file checksum is unchanged.
- All referenced built image/script/style assets resolve. Existing game HTML and
  resume/project PDFs return 200. An unknown route returns 404 locally.
- A separate raw curl GET of the built privacy URL returned 200 HTML, 12,262 bytes,
  including the policy before executing JavaScript, and no redirect.
- Full interactive/browser visual verification is **not completed**: no connected
  browser was available and the native Safari automation attempt timed out.
  The repository's old `App.spec.tsx` is a stale CRA sample and has no configured
  test runner; the new HTTP checks are the relevant executable regression suite.

## Deployment and AWS follow-up

1. Deploy the full rebuilt `dist` using the updated workflow. It must upload the
   extensionless objects with HTML content type; do not use the previous sync-only
   command. This has not been deployed by the audit. Keep the bucket's existing
   CloudFront origin access controls and public-access restrictions intact.
2. Wait for the workflow's CloudFront `/*` invalidation to complete. Confirm the
   distribution's **Default root object** is `index.html`. Verify no existing
   viewer-request function rewrites these real route objects to `/index.html`.
   If there is such a rewrite, exempt the exact allowlisted public paths.
3. In CloudFront **Error pages / Custom error responses**, inspect entries for
   **403 and 404**. After the route objects are deployed, stop mapping missing
   objects to `/index.html` with response code **200**. Remove that fallback, or
   use a dedicated error object while retaining an error status. Missing S3
   objects may return 403 with a private origin; a true 404 response can be
   configured for the site's missing-object case without granting bucket listing
   or public access. Do not mask unrelated authorization failures as successful
   pages. Invalid URLs must not return the home page with status 200.
4. Before removing the fallback, preserve any intentionally supported URL aliases.
   For the four non-root public paths only, configure an edge **301/308** redirect
   from the trailing-slash variant to the same path without the final slash
   (preserving query parameters). Do not apply a blanket directory rewrite to
   game/asset/private paths. Inspect and merge with any existing viewer-request
   function rather than overwriting it. `/shopcost-privacy` itself needs no rewrite.
5. Check the deployed URL directly: HTTPS GET and HEAD must return 200 HTML,
   include “Information ShopCost Collects” in the raw body, retain the canonical
   `https://timothyhatch.com/shopcost-privacy`, and have no X-Robots-Tag restriction.
   HTTP should still redirect 301 to HTTPS. `/sitemap.xml` must return XML, robots
   must allow crawling, and an invented URL must return an error status. Once
   caches expire, valid pages should no longer report `Error from cloudfront`.
6. Verify the five pages, menu navigation, light/dark appearance, and PDF controls
   in a normal browser. Submit `https://timothyhatch.com/sitemap.xml` in Google
   Search Console and use URL Inspection to request indexing of the privacy page.
   A sitemap or successful fetch does not guarantee inclusion or immediate results.
7. Retry the external web reader after deployment. If it still fails while direct
   GET succeeds with complete HTML, inspect CloudFront/WAF logs for that request
   and any route-specific challenge rules. Only adjust a confirmed blocking rule;
   there is no evidence supporting a blanket bot/security bypass.

Production HTTP behavior after deployment and actual search indexing remain to
be verified. AWS account/CDN configuration was not available to inspect or edit.

## Reference documentation

- [Vite SSR and static generation](https://vite.dev/guide/ssr)
- [CloudFront custom error responses](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesErrorPages.html)
