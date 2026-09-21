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
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { ROUTES as APP_ROUTES } from '../src/lib/routes.ts'

const PORT = 4173

const ROUTES = APP_ROUTES.map((path) => ({
  path,
  outFile: path === '/' ? 'dist/index.html' : `dist${path}/index.html`,
}))

async function main() {
  const previewServer = await preview({
    preview: { port: PORT, strictPort: true },
  })

  const browser = await chromium.launch()
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
