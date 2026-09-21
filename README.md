# BUGS — Back Up Gate Solution

One-page marketing site for **BUGS** (brand: **BUGZ**), a portable 12V DC backup battery that keeps electric gates and garage doors working through load shedding and power outages.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS (brand tokens in `tailwind.config.js`)
- Framer Motion (micro-interactions: nav underline, FAQ accordion, button hovers)
- GSAP + Lenis (smooth scroll, scroll-triggered section reveals)

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
```

## Structure

Single page composed in `src/App.tsx` from section components in `src/components/` (Nav, Hero, Problem, HowItWorks, Features, UseCases, FAQ, CTAContact, Footer). Shared scroll/animation helpers live in `src/lib/`.

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


