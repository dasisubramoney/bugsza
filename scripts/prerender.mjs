// Snapshots every route's fully client-rendered HTML into the build output.
//
// This is a pure Vite + React CSR app (now with client-side routing via
// react-router) — the raw HTML Vite emits for every route is just
// `<div id="root"></div>` plus a script tag. Search and AI crawlers that
// don't execute JavaScript (GPTBot, ClaudeBot, PerplexityBot, and most
// others) would see nothing. This script launches a local preview server,
// loads each route in headless Chromium, waits for it to render, and
// writes the resulting DOM to that route's own static file — so every page
// has real, route-specific content in its raw HTML, while browsers with JS
// still get the normal interactive React app once it loads (createRoot
// re-renders over the snapshot; there is no hydration mismatch to worry
// about since content is identical).
//
// Static hosts (Netlify included) serve `<path>/index.html` for a request
// to `<path>` or `<path>/` before falling back to the SPA catch-all
// redirect — so each route below gets its own crawlable file, and the
// catch-all in netlify.toml only kicks in for paths that don't exist here.
import { chromium } from 'playwright'
import { preview } from 'vite'
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { ROUTES as APP_ROUTES } from '../src/lib/routes.ts'

const PORT = 4173

const ROUTES = APP_ROUTES.map((path) => ({
  path,
  outFile: path === '/' ? 'dist/index.html' : `dist${path}/index.html`,
}))

async function main() {
  // Written here (after `vite build`, which empties dist/ before this
  // script runs) rather than as an earlier build step, so it survives.
  // verify-deploy.mjs's commit-verification check compares this against
  // `git rev-parse HEAD` to catch a stale deploy before trusting anything
  // else it finds on the site.
  const commitHash = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf-8' }).trim()
  mkdirSync('dist', { recursive: true })
  writeFileSync(resolve('dist/build-commit.txt'), commitHash, 'utf-8')
  console.log(`Wrote dist/build-commit.txt (${commitHash})`)

  const previewServer = await preview({
    preview: { port: PORT, strictPort: true },
  })

  // Windows blocks Playwright's own downloaded chrome-headless-shell.exe
  // from executing (Smart App Control, not ordinary SmartScreen — confirmed
  // it's still blocked even after Unblock-File strips the Mark-of-the-Web),
  // so launch the system-installed, Microsoft-signed Edge instead there.
  // Linux (Netlify's build environment) has no equivalent issue, so it
  // keeps using Playwright's default bundled Chromium unchanged.
  const browser = await chromium.launch(
    process.platform === 'win32' ? { channel: 'msedge', headless: true } : undefined,
  )
  try {
    const page = await browser.newPage()

    for (const { path, outFile } of ROUTES) {
      await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle' })
      // Give GSAP ScrollTrigger / Framer Motion mount effects a moment to
      // finish their initial (non-scroll-gated) render pass.
      await page.waitForTimeout(500)

      const html = await page.content()
      const outPath = resolve(outFile)
      mkdirSync(dirname(outPath), { recursive: true })
      writeFileSync(outPath, html, 'utf-8')
      console.log(`Prerendered ${path} -> ${outFile}`)
    }
  } finally {
    await browser.close()
    await previewServer.close()
  }
}

main().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
