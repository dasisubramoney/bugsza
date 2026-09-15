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
