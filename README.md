# BUGS — Back Up Gate Solution

One-page marketing site for **BUGS** (brand: **BUGZ**), a portable 12V/24V DC backup power unit that keeps electric gate and garage motors working through load shedding and power outages.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS (brand tokens in `tailwind.config.js`)
- Framer Motion (micro-interactions: nav underline, FAQ accordion, button hovers)
- GSAP + Lenis (smooth scroll, scroll-triggered section reveals)
- Playwright + `chrome-launcher`/`lighthouse` (build-time prerender + deploy verification — devDependencies, not shipped to the browser)

## Getting started

```bash
npm install
npm run dev            # start dev server
npm run build           # type-check + production build + prerender snapshot
npm run verify:deploy <netlify-app-url> [custom-domain-url]   # post-deploy checks
```

## Structure

Single page composed in `src/App.tsx` from section components in `src/components/` (Nav, Hero, Problem, HowItWorks, Features, UseCases, FAQ, Pricing, CTAContact, Footer). Shared scroll/animation helpers live in `src/lib/`. Confirmed business facts (name, phone, hours, service area, pricing, domain) live in one place, `src/lib/businessInfo.ts`, and are imported everywhere they're used — update a fact there, not in each component.

## SEO / AI-crawler foundation

- `src/lib/businessInfo.ts` — single source of truth for every confirmed business fact used in copy, structured data, and generated files.
- `src/components/StructuredData.tsx` — homepage JSON-LD: a `LocalBusiness` block plus a separate `Product` block for the unit (its price lives here, not on the business listing, since installation is billed separately). `src/components/FAQ.tsx` emits its own `FAQPage` JSON-LD block.
- `public/robots.txt` — explicitly allows ClaudeBot, GPTBot, OAI-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, and Bingbot, plus a general `Allow: /`; references the sitemap.
- `public/llms.txt` — plain-language business description for AI assistants, built only from confirmed facts.
- `vite-plugins/sitemap.ts` — generates `dist/sitemap.xml` on every `vite build` (not hand-maintained). Single-page site, so it lists only the homepage — anchor sections aren't separate crawlable documents.
- `scripts/prerender.mjs` — runs after `vite build`: launches the built app in headless Chromium and overwrites `dist/index.html` with the fully client-rendered HTML. This is a pure CSR React app; without this step, crawlers that don't execute JavaScript (which is most AI crawlers — GPTBot, ClaudeBot, PerplexityBot included) would see only `<div id="root"></div>`. Verified: the prerendered HTML contains the real `<h1>`, body copy, and both JSON-LD blocks, and the live app still mounts over it with zero console errors and no broken interactivity.
- `netlify/edge-functions/noindex-preview.ts` + `netlify.toml` — adds `X-Robots-Tag: noindex` only when a request's hostname ends in `.netlify.app`, never on the custom domain. This has to be an edge function, not a static `netlify.toml` `[[headers]]` rule — header rules apply to the deploy regardless of which hostname served the request, since the `*.netlify.app` URL and the custom domain point to the same build; only a per-request hostname check can tell them apart.
- `scripts/verify-deploy.mjs` — post-deploy check covering: raw HTML contains real content (no JS execution), `/robots.txt` + `/sitemap.xml` + `/llms.txt` all return 200 with expected content, a Lighthouse mobile run (performance + SEO scores), the custom domain's SSL certificate is valid, and the custom domain resolves and serves the same content as the Netlify URL. Dry-run against a local preview server: 13/15 checks pass; the two domain-dependent checks correctly fail with "expected until the domain is purchased and deployed" rather than crashing.

### Known gaps / TODOs (flagged, not guessed)

- **Domain not yet purchased.** `bugsza.co.za` is confirmed available but not live. Canonical/OG URLs, the JSON-LD `url`, `robots.txt`'s sitemap reference, and `llms.txt` are all written for that domain and will not resolve until it's bought and deployed.
- **Charge-time / cycle-count figures don't exist yet.** The product is still being tested; the FAQ says so honestly rather than inventing a number.
- **Logo artwork still says "12V DC" only.** The client confirmed both 12V and 24V are supported, and all editable copy (Hero badge, Features, alt text) now reflects that — but the actual logo graphic (`Bugz_co_za_Updated_Logo.png`) has "12V DC" baked into its pixels. That needs a design update from whoever owns the source art; it can't be fixed in code.

## Change log

### 2026-09-14 — Dasendhran Subramoney

- Scaffolded the project with Vite + React 18 + TypeScript, pinned off the default React 19 / Tailwind v4 scaffold to match the required stack
- Installed and wired up Tailwind CSS, Framer Motion, GSAP, and Lenis smooth scroll
- Added the BUGZ logo asset and set brand colors (orange, black, white, yellow) as Tailwind tokens
- Built sticky nav with scroll-spy underline, transparent-to-solid-orange transition on scroll, and a mobile hamburger menu
- Built the Hero section with verbatim client copy and a GSAP logo crawl-in / lightning-flash entrance animation
- Built the Problem section (icon cards on the pain points of losing gate power)
- Built the How It Works section with the verbatim 3-step explainer copy
- Built the Features section (12V DC, portable, recharge anywhere, no install, gate + garage compatible)
- Built the Use Cases section (load shedding, grid outages, complexes/estates)
- Built the FAQ accordion (Framer Motion height animation), with answers flagged as placeholder copy for client review
- Built the closing CTA/Contact band with a "Keep Rollin'" callback, placeholder WhatsApp/phone links, and an unwired placeholder contact form
- Built the Footer with logo, repeated nav links, and placeholder social icons
- Verified the build with `tsc -b` and `npm run build`, and smoke-tested the running site with a headless browser at 1440px and 375px (nav scroll-spy, mobile menu, FAQ accordion, zero console errors)

### 2026-09-15 — Damian de Boer

- Hero: added the "12V DC · Backup Power · Gates • Garages" black pill badge above the headline, framed the logo image in a black-bordered card with a hard drop-shadow, and gave the yellow CTA button a matching black border
- Nav: switched the header from transparent-on-load/orange-on-scroll to a persistent white background
- Problem section: changed the pain-point cards from white to orange fill to match the card style used in How It Works
- Verified changes with a headless-browser screenshot pass against the running dev server

### 2026-09-15 — Dasendhran Subramoney

- How It Works: added a callout noting the unit must initially be professionally installed and then runs plug-and-play, and updated the closing line so it no longer contradicts that (was "No installation. No electrician. No waiting.")
- Features: renamed the "No installation required" card to "Plug-and-play after setup" to match the professional-installation requirement
- FAQ: updated the "Do I need an electrician to set it up?" answer to match
- Features: turned each card into a 3D flip tile — icon and title show by default, hovering (or keyboard focus) flips the card to reveal the supporting copy on the back
- FAQ: resized the section heading so "FAQ" is the larger label and "Good questions." is the smaller line underneath
- Verified all changes with a headless-browser screenshot pass against the running dev server, zero console errors

### 2026-09-15 — Damian de Boer (2)

- Problem, How It Works, and Contact cards: added a hover state — a soft blurred color glow behind the card plus a slight lift — matched per-section (yellow glow on Problem/Features, orange on How It Works, black on Contact)
- Problem and How It Works cards: fixed uneven card heights within a row (cards now stretch to match the tallest sibling instead of hugging their own content)
- Problem cards: tuned the glow to be more prominent while keeping it fully contained within its own card (no bleed onto neighboring cards)
- Contact section: fixed the glow on the "Talk to us directly" card incorrectly stretching to match the taller "Or send a message" card's height, caused by the grid's default row-stretch behavior
- Features cards: reverted the glow effect (superseded by the 3D flip-card treatment already on `main`), keeping only the hover lift

### 2026-09-16 — Dasendhran Subramoney

- Hero: prototyped a torn-paper "product reveal" (moved the logo card up, added the real product photo behind a jagged/curled tear) through several iterations per feedback, then fully reverted it back to the original single bordered logo card once product-image changes were no longer wanted
- How It Works: added the callout fee (R650/hour, final cost varies by distance/site), noted BUGS supplies an accredited installer, and added the service area (Greater Johannesburg) to the installation notice
- FAQ: added a "What warranty comes with it?" question (battery warranty is carried by the battery brand), and updated the installer answer to mention BUGS supplies the accredited installer
- FAQ and Features: updated compatibility copy site-wide to state BUGS currently supports Centurion motors only (was previously implying any/most motor brands)
- Contact form: added a property-type selector (Residential house / Complex / Commercial building) with conditional follow-up questions per type — motor voltage and brand for all types, plus unit count and gate access (guard vs. remote) for complexes, and school/business type and gate access for commercial buildings
- Verified all changes with `tsc -b` and headless-browser screenshot passes against the running dev server, zero console errors

### 2026-09-21 — Dasendhran Subramoney

- Added client-side routing (`react-router-dom`) and split the site into `src/pages/` (`HomePage`, `GoingSmartPage`, `InnovationCentrePage`), with a scroll-to-top on route change
- Hero: added an "Our Partners" row below the BUGS graphic, in the same section, linking out to two new partner pages
- Built the Going Smart Energy Solutions page (`/going-smart`) — navy/green branding sampled from their logo, Smart Tech Audit / Practical Solutions content, tel-link to Craig
- Built The Innovation Centre page (`/innovation-centre`) — neutral palette with BUGS orange used sparingly as an accent, the 5-point "what it provides" feature grid, on-site resources list, and a CTA (reusing Craig's number, flagged as an assumption pending client confirmation)
- Neither partner page was added to the main nav, per instructions — reachable only via the homepage partner cards
- Enlarged and restyled the partner cards on the homepage (bigger footprint, thicker border, "Partner" badge, "Visit site" hover hint) to match the site's existing hover-glow/lift pattern and make them more clickable
- Partner cards now open their page in a new tab (`target="_blank"`, `rel="noopener noreferrer"`) instead of navigating away from the homepage
- Verified with `tsc -b`, a production `npm run build`, and headless-browser passes — including a direct deep-link test to `/going-smart` and a same-context new-tab test confirming both partner links open a real second tab — zero console errors

### 2026-09-21 — Dasendhran Subramoney (2)

- Wired the "Or send a message" contact form up to Netlify Forms: added a static hidden shadow form in `index.html` (required for Netlify's build-time form detection in a Vite SPA) covering every field in the real form, including the motor-voltage/brand/units/access/building-type fields added earlier — not just the core name/phone/property-type/message set — so no submitted data is silently dropped
- Contact form fields are now controlled React state (previously uncontrolled) so they can be validated and posted programmatically
- Submit now does a real `fetch('/', …)` POST with URL-encoded form data; shows "Sending…" and disables the button in flight, a success state that resets the form, and a new inline error banner on failure
- Added an off-screen (not `display:none`) honeypot field bound to state, checked client-side before submit and backed by Netlify's own server-side honeypot check
- Added inline validation (required name/phone, a South Africa-friendly phone format check, required property type) that blocks submission before any network call
- Verified with `tsc -b`, a production build (confirmed the shadow form survives the Vite build unchanged), and headless-browser tests of the validation, honeypot-blocking, and submit/error flows against the dev server — flagged the Netlify dashboard setup (notifications, confirming the form registers, Akismet) as manual post-deploy steps, and noted that confirming a real submission lands in the Netlify dashboard needs the live deploy

### 2026-09-21 — Damian de Boer (3)

- Added a floating, scroll-sticky WhatsApp button (bottom-right) and wired the confirmed WhatsApp/phone number (078 362 8387) into the contact card, the floating button, and the Footer's WhatsApp social link
- Replaced the generic message-bubble icon with the real WhatsApp logo (official glyph) everywhere WhatsApp is referenced
- Added business hours ("Mon–Fri, 8am–5pm") to the contact card
- How It Works: restructured the install/service-area/callout-fee callout from one dense run-on paragraph into a 3-item info strip (icon + label + detail) spanning the full section width, matching the step cards below instead of being cramped into the narrow heading column
- Added a Pricing section (R4,500, subject to change; delivery subject to locality) with the real product photo alongside the price card, both with the site's hover-glow treatment; added "Pricing" to the nav
- Centered the Features section's orphaned last row (2 cards) by switching that grid to a wrapping flexbox with `justify-center`
- Updated site-wide copy (Hero badge, Features, image alt text) from "12V DC" to "12V/24V DC" per client confirmation that BUGS supports both — flagged that the logo artwork itself still says "12V DC" only and needs a design update, which can't be done in code
- FAQ: removed leftover internal placeholder text ("Client to confirm tested figures") that had leaked into live copy, and rewrote all five answers as plain, quotable, marketing-language-free sentences
- Built the SEO / AI-crawler foundation described above: `businessInfo.ts` single source of truth, homepage `LocalBusiness` JSON-LD, `robots.txt` (named AI-crawler allowlist), `llms.txt`, build-time `sitemap.xml` generation, a Playwright-based prerender step so crawlers that don't execute JavaScript still see real content, a Netlify edge function scoping `noindex` to the `*.netlify.app` preview URL only, and a `verify-deploy.mjs` post-deploy check script
- Verified with `tsc -b`, a full `npm run build` (including the new prerender step), a dry run of `verify-deploy.mjs` against a local preview server (13/15 checks pass; the 2 domain-dependent checks correctly fail until `bugsza.co.za` is purchased and deployed), and headless-browser passes confirming zero console errors and no broken interactivity

### 2026-09-21 — Damian de Boer (4)

- JSON-LD: swapped `Electrician` for `LocalBusiness`, and split pricing out into its own `Product` block (name, unit-only price R4,500 ZAR under `offers`) rather than folding it into the business listing — the business and the unit's price are separate concerns now that installation is billed separately
- JSON-LD: added `telephone` to the `LocalBusiness` block
- Added a `PHONE_E164_SPACED` fact ("+27 78 362 8387") to `businessInfo.ts` for structured data and `llms.txt`, kept in sync between the two; `llms.txt`'s Contact section now lists Phone and WhatsApp explicitly
- Audited the meta description, OG description, and FAQ copy for language that could read as the R4,500 unit price including installation — found and fixed one real instance ("R4,500, professionally installed" in both the meta and OG descriptions reads as a bundled package) and strengthened the "Do I need an electrician?" FAQ answer to state installation is billed separately at the callout rate
- Pricing section: added an explicit "unit only, installation billed separately" line to the price card itself, the most exposed spot for this exact misreading, even though not named in the original ask

### 2026-09-21 — Damian de Boer (5)

- Fixed a real gap the client-side routing change (`/going-smart`, `/innovation-centre`) opened up in the SEO/AI-crawler work from earlier today: the prerender step only ever snapshotted `/`, so a crawler fetching either partner page directly would have gotten the homepage's content instead of that page's own
- `src/lib/routes.ts` — new single source of truth for the app's route list, imported by `scripts/prerender.mjs`, `vite-plugins/sitemap.ts`, and `scripts/verify-deploy.mjs`, so they can't drift out of sync with `src/App.tsx` or each other
- `scripts/prerender.mjs` now snapshots every route into its own static file (`dist/going-smart/index.html`, `dist/innovation-centre/index.html`), not just `dist/index.html`
- `vite-plugins/sitemap.ts` now lists all three routes instead of only the homepage
- `netlify.toml` — added explicit redirects for `/going-smart` and `/innovation-centre` to their own `index.html`, ahead of the SPA catch-all. Netlify's static-asset resolution should already serve those files for a no-trailing-slash request ("pretty URL" matching), but that isn't verifiable from this dev environment (`vite preview` doesn't replicate it locally — confirmed while testing, see below), so the explicit rule removes the ambiguity for what every link on the site actually requests
- `scripts/verify-deploy.mjs` section 1 now checks raw HTML on all three routes, not just `/`
- Verified with `tsc -b`, a full `npm run build`, and a direct check of each route's built file (all three contain distinct, real content, confirmed by byte size and route-specific text). Flagged, not fixed: `vite preview` served the homepage snapshot for `/going-smart` with no trailing slash locally (worked correctly with a trailing slash, or via `/going-smart/index.html` directly) — this needs a real Netlify deploy to confirm the redirect rules above actually produce the intended behavior in production, since local `vite preview` isn't a reliable proxy for Netlify's routing

### 2026-09-22 — Dasendhran Subramoney

Pre-launch hardening pass (legal, security, SEO, performance, accessibility, UX), plus a follow-up cookie banner. Worked section by section per the client's checklist; noted below what needed a decision or real content instead of guessing.

- **Legal**: added `/privacy` and `/terms`, linked from the footer, written only from confirmed facts (business name, phone, WhatsApp, service area, no fixed address, POPIA reference). No company registration number or designated Information Officer exists yet — flagged on the Privacy page itself as "being finalised" rather than invented, with phone/WhatsApp as the interim contact channel for privacy requests
- **Security**: grepped the codebase for API keys/tokens/secrets — none found. Force-HTTPS is a Netlify dashboard default, not a code change; flagged as a one-time check once the domain is connected
- **SEO**: the favicon was still the default Vite placeholder this whole time — replaced with a real set cropped from the beetle mark alone (full logotype doesn't read at 16-32px), plus a web manifest. Added a generated 1200×630 OG/Twitter card image and full social meta tags. Found that every route was prerendering with the homepage's title/canonical (no per-route `<title>`/meta management existed) — built `useDocumentMeta` and wired it into every page; verified each route's prerendered HTML now carries its own title and canonical
- **Images/performance**: the logo shipped as a 1.15MB PNG everywhere, including places rendering it at 56px. Resized and converted the logo, product photo, and partner logo to WebP (~90%+ smaller each); added `loading="lazy"` to below-fold images; added `prefers-reduced-motion` handling to the Hero entrance and the shared `Reveal` scroll-animation used site-wide (skips animation and the infinite glow loop entirely). Audited color contrast and found `orange-dark` on white is only 3.05:1 (fails AA for body text, was in use on FAQ/Privacy/Terms links and several labels) — added a darker AA-compliant token (`orange-text`, 4.99:1) for the small-text usages, left the original shade where it's large text or decorative icons (both fine at 3:1)
- **Mobile**: verified zero horizontal scroll at 320px/375px/1440px across all 6 routes, including the 404 page
- **Navigation/UX**: found "Get Yours" (the actual purchase CTA) styled as the secondary/outline button while "See How It Works" got the primary yellow treatment — swapped them, and matched Pricing's button to the same style, so there's one consistent primary CTA look site-wide. Built an on-brand 404 page as the router's catch-all; set `netlify.toml`'s SPA-fallback redirect to return a real `404` status instead of `200`. Fixed the fixed WhatsApp button overlapping the footer's "Keep Rollin'" tagline at the bottom-right corner
- **Contact/forms**: no email address exists anywhere in the project — flagged, not invented; the site currently only offers phone/WhatsApp as contact channels
- **Content/links**: no leftover placeholder copy found except the Facebook/Instagram footer icons, which were already intentionally marked as placeholders — flagged as still needing real profile URLs
- **Analytics**: asked the client which platform (GA4 vs Plausible) before wiring anything up, per their explicit instruction — client chose to skip analytics for this pass
- **Cookie banner** (follow-up request, since analytics is coming later): built anyway, ahead of analytics being chosen, so consent is already in place when it lands. `useCookieConsent`/`cookieConsent.ts` store the choice in `localStorage`; `hasAnalyticsConsent()` is there for whichever analytics loader gets wired up later to check before it runs. Banner is mounted once in `App.tsx` so it shows on every route, not just the homepage; the floating WhatsApp button now steps up above it while it's showing instead of sitting underneath it. Updated the Privacy Policy's "Analytics and cookies" section to describe the banner now that it exists
- **Process note**: initially built a whole second sitemap generator (`scripts/generate-sitemap.mjs`, wired into `npm run build`) without noticing `vite-plugins/sitemap.ts` already did the same job automatically via Vite's `closeBundle` hook — a gap in the initial survey (checked `scripts/` and `public/` but never looked for a `vite-plugins/` directory). Caught it before committing: removed the duplicate script and the extra build step, and merged its one genuine improvement (differentiated `changefreq` — weekly for the homepage, yearly for legal pages, monthly for everything else, versus the original's uniform `monthly`) into the existing plugin instead
- Verified everything with `tsc -b`, a full production build (prerender + sitemap pipeline), and headless-browser passes — including a cookie-banner accept/decline/reload test confirming the choice persists via `localStorage` — zero console errors throughout

### 2026-09-22 — Damian de Boer (6)

- Removed the Facebook and Instagram placeholder icons from the footer's social row (flagged as needing real profile URLs in the pass above — client decided to drop them rather than wait) — only the working WhatsApp link remains
- Added a hover effect to the desktop nav links: a line now animates left-to-right under each word on hover (CSS `scale-x` transform, `transition-transform`), separate from the existing scroll-spy underline that marks the active section

### 2026-09-27 — Damian de Boer (7)

- Fixed `scripts/verify-deploy.mjs`'s Lighthouse run failing with `EPERM` on Windows: chrome-launcher was defaulting to a random `%TEMP%\lighthouse.<random>` user-data-dir and then failing to delete it on exit (an AV/indexer file-lock issue specific to Windows). Now passes an explicit, project-local `.lighthouse-chrome-profile` dir (gitignored) to `chrome-launcher`'s `launch()`, which both avoids the OS temp dir and makes chrome-launcher skip its own cleanup step entirely for caller-supplied dirs
- `verify-deploy.mjs` section 3 now prints every audit in Lighthouse's `seo` category (pass/fail + reason), not just the aggregate score, and adds a new check (3-3): fetches `https://bugsza.netlify.app/` directly and asserts `X-Robots-Tag: noindex` — confirms the noindex edge function is actually doing its job on the preview subdomain
- Replaced the Google Fonts CDN link (`fonts.googleapis.com`/`fonts.gstatic.com`, two `preconnect` hints + one blocking stylesheet `<link>`) with self-hosted fonts via `@fontsource/inter` (weights 400/500/600/700/800, matching actual usage) and `@fontsource/archivo-black` (only ships weight 400 — checked the registry first, `@fontsource-variable/archivo-black` doesn't exist). Imported as CSS in `src/main.tsx`; `tailwind.config.js`'s `fontFamily` names (`Inter`, `"Archivo Black"`) needed no changes since fontsource ships identical `font-family` names to Google Fonts. Verified: zero `fonts.googleapis`/`fonts.gstatic` references anywhere in `dist/` after build, both fonts' `@font-face` rules present in the built CSS pointing at self-hosted `/assets/*.woff2` files. This was flagged as a render-blocking resource in the Lighthouse insights breakdown two sessions ago (`render-blocking-insight`, ~530ms estimated FCP/LCP savings) — self-hosting removes the extra DNS/connect/render-blocking-stylesheet round trip to Google's CDN entirely
- Known gap, unrelated to the font work: local `npm run build`'s prerender step (`scripts/prerender.mjs`) currently fails on this machine with Playwright's headless Chromium erroring `spawn UNKNOWN` — looks like a broken/incomplete local browser install, not a code regression (`vite build` itself completes fine beforehand, and Netlify's own build environment installs its own Linux Chromium via `postinstall`, unaffected by this). Not investigated further this session; flagging for whoever hits it next

### 2026-09-27 — Damian de Boer (8)

- Root-caused the `spawn UNKNOWN` from the entry above: it's Windows Smart App Control blocking Playwright's downloaded `chrome-headless-shell.exe` from executing (confirmed — still blocked even after `Unblock-File` strips the Mark-of-the-Web, which rules out ordinary SmartScreen). `scripts/prerender.mjs` now launches the system-installed, Microsoft-signed Edge (`{ channel: 'msedge', headless: true }`) on `win32` only; Linux (Netlify's build environment) is untouched and keeps Playwright's default bundled Chromium. Verified: `npm run build` now exits 0 locally and prerenders all five routes with real content
- Added a commit-verification check to the deploy pipeline, since every other `verify-deploy.mjs` check is only meaningful against a deploy that actually matches the code being tested: `scripts/prerender.mjs` now writes `dist/build-commit.txt` (`git rev-parse HEAD`) after `vite build`; `verify-deploy.mjs` runs a new section 0 first that fetches that file from the target URL and compares it to local `HEAD`, printing both values and skipping every remaining check on mismatch rather than producing misleadingly green results against a stale build. Fixed a rough edge in its own first version: a 404 on `/build-commit.txt` gets Netlify's SPA-fallback HTML instead of a plain 404 body, and the check originally dumped that whole page (tens of KB) into the failure output — now anything that isn't a 40-char hex commit hash is summarized (byte count + short prefix) instead of printed verbatim
- Deploy-latency finding, not a code issue: pushes to `main` during this session took anywhere from ~15 to 30+ minutes to actually appear live on `bugsza.netlify.app` (confirmed by polling `/build-commit.txt` and, before that existed, the built asset hashes) — Netlify deploys here are just slow, not failing; ruled out a peer-dependency install failure as the cause by reproducing Netlify's install step locally (`rm -rf node_modules && npm ci`, no `--legacy-peer-deps`), which completed cleanly. Flagging since it makes "push and immediately verify" an unreliable workflow on this site until/unless build times improve
- `.gitignore`: added `.netlify` (Netlify CLI's local build-cache folder — edge function bundles, site state) and `deno.lock` (the Deno lockfile the CLI generates locally while bundling the edge function; Netlify's own cloud build regenerates this itself, so a machine-specific snapshot here would only go stale) — both appeared locally as a side effect of using the Netlify CLI this session, neither is meant to be tracked

### 2026-09-28 — Dasendhran Subramoney

- Wired in the real Innovation Centre logo (`src/assets/Innovation_Centre_Logo.png`, supplied this session) everywhere the partner was previously represented by a placeholder icon+text treatment: the homepage "Our Partners" card, the partner page's header, and its hero. Optimized the same way every other asset in this project is (extended `scripts/generate-image-assets.mjs`'s resize list, 1.7MB source → 51KB WebP, no PNG fallback — same WebP-only call made for the other small logos, documented previously)
- Replaced `InnovationCentrePage.tsx`'s placeholder neutral/BUGS-orange palette with the Innovation Centre's own colors — sampled directly from the logo's pixels (radial/scan sampling via `sharp`, not eyeballed) rather than guessed: navy `#0B2A52` (the wordmark), green `#3E7D29`, gold `#F9BE1E` (the ring and bulb). Checked contrast on all three before using them the same way the earlier `orange-text` fix was justified: the raw sampled green was 4.16:1 on white (fails AA for body text), darkened to `#3E7D29` for 5.04:1; gold is 1.69:1 on white so it's used as a fill only, always with navy text on top, never as text-on-light itself
- Verified with `tsc -b`, a full production build (all 5 routes still prerender), and headless screenshots of the updated card and full page — zero console errors

### 2026-09-28 — Damian de Boer (9)

- **Bundle/performance pass**: converted every `<motion.xxx>` usage to `<m.xxx>` under a single `<LazyMotion features={domMax}>` wrapper in `App.tsx` (`domMax` rather than the smaller `domAnimation`, because `Nav.tsx`'s active-tab underline uses `layoutId`, a layout-animation feature `domAnimation` doesn't cover); switched both GSAP imports from the default `import gsap from 'gsap'` to the tree-shakeable named `import { gsap } from 'gsap'`; extracted `Reveal.tsx`'s GSAP ScrollTrigger setup into `src/lib/sections/revealAnimation.ts` and gated it behind an `IntersectionObserver` + dynamic `import()` so below-the-fold sections (Problem, HowItWorks, Features, UseCases, FAQ, Pricing, CTAContact) no longer pull GSAP into the initial bundle; added `manualChunks` to `vite.config.ts` (`vendor`/`motion`/`gsap`). Verified in the actual `dist/` output, not just config: separate `vendor-*.js`, `motion-*.js`, `gsap-*.js`, and a dynamically-split `revealAnimation-*.js` chunk
- Brought `scripts/prerender.mjs`'s existing Windows/Edge branch in line with an explicit `isWindows` check and `{ headless: true }` passed on both platforms (previously relied on Playwright's implicit default for the non-Windows branch)
- Added a 4-photo "Inside the workshop" gallery to `InnovationCentrePage.tsx` (real factory floor photos supplied this session — woodworking floor with CNC routers, metal fabrication bay, panel saw/edge-bander station, press brake + fiber laser cutter), resized/WebP'd via the same `scripts/generate-image-assets.mjs` pipeline as every other image asset. Centered the "What it provides" grid's orphaned last row (2 cards) the same way the homepage Features section was fixed earlier — wrapping flexbox with `justify-center` instead of an uneven CSS grid
- Reconciled this work with a parallel session's Innovation Centre logo/palette commits (`66dc80d`, `4f1c493` — real logo wiring and a WCAG-verified navy/green/gold palette, entry above) via `git pull` and a manual three-way merge: kept their logo placement and palette exactly as verified, layered the workshop-photo gallery on top since it didn't exist upstream, and resolved one real conflict in `PartnersRow.tsx` (their still-`motion`-based import vs. this session's `m`/LazyMotion conversion — kept `m`, since the rest of that file's JSX had already been converted and merged cleanly around it)
- Verified with a full production build after the merge (`tsc -b` + `vite build` + prerender, all 5 routes) and confirmed both the real logo and the new gallery section are present in the prerendered `/innovation-centre` HTML

### 2026-09-28 — Dasendhran Subramoney (2)

- Added an email address field to the contact form, required (not optional) — blocks submission with an inline error if left blank, same treatment as name/phone, with a loose format check once something's entered. Added `name="email"` to the static Netlify Forms shadow form in `index.html` so submissions actually capture it, and updated the Privacy Policy's "what we collect" list to match
- Pulled and merged this in on top of the same day's parallel LazyMotion/bundle-splitting work (`CTAContact.tsx` had diverged: `motion.*` → `m.*` upstream vs. the new email field locally) — merge was automatic, no conflicts; verified afterward with `tsc -b`, a full production build, and a headless-browser pass confirming the email field still renders, validates, and submits correctly post-merge

### 2026-09-28 — Damian de Boer (10)

- Added two supplied photos (smart utility meters, a solar-equipped home) to `GoingSmartPage.tsx`'s hero as a two-column image row below the intro paragraph, resized/WebP'd via `scripts/generate-image-assets.mjs` and matched to the page's existing green-bordered card style
- Updated the hero and CTA copy per the client's confirmed change from an electricity-only to an electricity-**and-water** framing: headline, intro paragraph, both feature-card bodies, the closing CTA heading, and the meta description (previously electricity-only, now inconsistent with the visible copy otherwise)
- Fixed the Going Smart logo appearing visually off-center despite correct CSS centering (`mx-auto`) — root-caused with a pixel scan of the source file rather than guessed: the artwork itself was asymmetrically placed within its own canvas (103px of empty padding on the left, only 35px on the right), so no amount of container centering could fix what was already off-center inside the image. Cropped `src/assets/Going_Smart.png` to remove only the excess left/top padding (94px left, 18px top — verified no artwork pixels were touched) and regenerated the WebP through the existing pipeline; the same asset is used on the homepage partner card too, so that's fixed as a side effect
- Verified with a full production build and headless screenshots at 800px/1191px/1440px viewport widths confirming the logo, heading, and image row all share the same visual center

### 2026-09-29 — Dasendhran Subramoney

- Applied a full round of copy edits from the client's marked-up document across the homepage: reworded the hero subhead and bumped its font size, trimmed several How It Works/Features sentences, reordered and rewrote all five Features cards to the client's numbered sequence, renamed "Use Cases" to "Battery Backup Applications" (nav label + section eyebrow) and added a new "Battery Failure" card, dropped the FAQ subtitle, rewrote all five FAQ answers, reformatted the price to `R 4,500.00`, and renamed the purchase CTAs to "Order Yours"/"Order Yours Today". Kept `public/llms.txt`, `index.html`'s meta/OG/Twitter tags, `scripts/verify-deploy.mjs`'s content assertion, and `TermsPage.tsx` in sync with the price/service-area/wording changes so nothing on the site contradicts the new copy
- Fixed a mobile bug the client flagged ("Get Yours" not landing on the questionnaire): every purchase CTA (hero, pricing card, nav) now scrolls straight to the contact form itself (`#contact-form`, a new id on the `<form>`) instead of the top of the whole contact section — verified with a mobile-viewport Playwright tap test confirming the name field lands in view
- Moved the mobile "Order Yours" button out of the hamburger dropdown and into the fixed header bar next to the menu icon, matching where it already lived on desktop, per a follow-up request
- Restructured the hero into a single centered column (badge/heading/CTAs, then logos) at every breakpoint instead of a two-column desktop-only layout, per a follow-up request to center everything and keep the same treatment on mobile/tablet. Folded the large standalone BUGS logo (previously a bigger showcase image with its own GSAP glow/flash entrance animation) into the partner-logos row as a third, equally-sized card — sized identically to the Going Smart and Innovation Centre cards, which were themselves resized to match each other (Going Smart's logo was rendering much smaller than Innovation Centre's despite similar CSS classes, since their source aspect ratios differ wildly — equalized by height instead). Positioned BUGS as the center card between the two partners per a final follow-up
- Swapped in the client's updated BUGS logo artwork (new "12/24V DC" badge wording) as `src/assets/Bugz_co_za_Updated_Logo.png`. The favicon generator crops a fixed pixel rectangle around just the beetle mark (the full logotype doesn't read at 16–32px) — that rectangle was calibrated to the old artwork's exact layout, so recalculated it against the new image (verified visually via cropped test renders before committing to coordinates) and regenerated every derived asset: favicons, apple-touch-icon, the OG/Twitter card image, and the resized WebP used across the site
- Pulled and merged this in on top of a parallel session's Going Smart photo-row and copy work — both sessions had touched `scripts/generate-image-assets.mjs` (this session's favicon-crop constant vs. their two new `going-smart/` resize jobs, in different parts of the file) and `Going_Smart.webp` (only their side had real changes; this session's regeneration of that file was byte-identical to what was already committed, so no actual conflict). Merge was automatic, no conflict markers; verified afterward with `tsc -b` and a full production build, all 5 routes prerendering correctly
