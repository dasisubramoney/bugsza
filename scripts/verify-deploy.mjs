// Post-deploy verification script.
//
// Usage:
//   node scripts/verify-deploy.mjs <netlify-app-url> [custom-domain-url]
//
// <netlify-app-url> is required — it's assigned by Netlify at deploy time,
// so it can't be hardcoded here. [custom-domain-url] defaults to the
// confirmed production domain (SITE_URL in src/lib/businessInfo.ts) and is
// only meaningfully testable once bugsza.co.za is purchased and pointed at
// the Netlify site — until then, checks 4 and 5 will correctly fail (there
// is nothing at that domain yet).
//
// Covers:
//   1. Raw HTML (no JS execution) contains real page content
//   2. /robots.txt, /sitemap.xml, /llms.txt all return 200 with expected content
//   3. Lighthouse mobile performance + SEO scores
//   4. SSL certificate on the custom domain is issued and valid
//   5. The custom domain resolves and loads correctly (not just *.netlify.app)
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import tls from 'node:tls'
import { URL } from 'node:url'
import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'
import { SITE_URL } from '../src/lib/businessInfo.ts'
import { ROUTES } from '../src/lib/routes.ts'

const execFileAsync = promisify(execFile)

const netlifyUrl = process.argv[2]
const domainUrl = process.argv[3] ?? SITE_URL

if (!netlifyUrl) {
  console.error(
    'Usage: node scripts/verify-deploy.mjs <netlify-app-url> [custom-domain-url]',
  )
  process.exit(1)
}

let failures = 0
const ok = (label) => console.log(`  \x1b[32m✓\x1b[0m ${label}`)
const fail = (label, detail) => {
  console.log(`  \x1b[31m✗\x1b[0m ${label}${detail ? ` — ${detail}` : ''}`)
  failures++
}
const section = (title) => console.log(`\n${title}`)

// ---------------------------------------------------------------------
// 1. Raw HTML contains real, route-specific content without executing JS
// ---------------------------------------------------------------------
section('1. Raw HTML content per route (no JS execution)')
for (const routePath of ROUTES) {
  const url = new URL(routePath, netlifyUrl).toString()
  try {
    const res = await fetch(url)
    const html = await res.text()
    const bodyOnly = html.replace(/<script[\s\S]*?<\/script>/gi, '')

    if (res.ok) ok(`GET ${url} → ${res.status}`)
    else fail(`GET ${url}`, `status ${res.status}`)

    if (/<h1[^>]*>[^<]+<\/h1>/.test(bodyOnly)) ok(`${routePath}: <h1> with real text present`)
    else fail(`${routePath}: <h1> with real text present`, 'no non-empty <h1> found')

    if (routePath === '/') {
      if (bodyOnly.includes('R4,500') || bodyOnly.includes('Centurion')) {
        ok(`${routePath}: real body copy (pricing/compatibility facts) present`)
      } else {
        fail(`${routePath}: real body copy present`, 'expected facts not found — is dist/ prerendered?')
      }
      if (html.includes('application/ld+json')) ok(`${routePath}: JSON-LD structured data present`)
      else fail(`${routePath}: JSON-LD structured data present`)
    } else {
      // Partner pages are proof the per-route prerender actually served
      // that route's own file rather than falling through to the
      // homepage snapshot — a non-trivial amount of visible text is the
      // generic signal, since their copy isn't a "confirmed fact" this
      // script otherwise knows about.
      const visibleText = bodyOnly.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
      if (visibleText.length > 200) ok(`${routePath}: substantial visible text present (${visibleText.length} chars)`)
      else fail(`${routePath}: substantial visible text present`, `only ${visibleText.length} chars — likely served the homepage fallback instead of this route's own file`)
    }
  } catch (err) {
    fail(`Fetch ${url}`, err.message)
  }
}

// ---------------------------------------------------------------------
// 2. robots.txt, sitemap.xml, llms.txt
// ---------------------------------------------------------------------
section('2. robots.txt / sitemap.xml / llms.txt')

async function checkTextFile(path, expectedSubstrings) {
  const url = new URL(path, netlifyUrl).toString()
  try {
    const res = await fetch(url)
    const body = await res.text()
    if (res.status === 200) ok(`${path} → 200`)
    else fail(`${path} → 200`, `got ${res.status}`)

    for (const expected of expectedSubstrings) {
      if (body.includes(expected)) ok(`${path} contains "${expected}"`)
      else fail(`${path} contains "${expected}"`, 'not found')
    }
  } catch (err) {
    fail(`Fetch ${path}`, err.message)
  }
}

await checkTextFile('/robots.txt', ['GPTBot', 'ClaudeBot', 'Sitemap:'])
await checkTextFile('/sitemap.xml', ['<urlset', '<loc>'])
await checkTextFile('/llms.txt', ['BUGS', 'Greater Johannesburg'])

// ---------------------------------------------------------------------
// 3. Lighthouse — mobile performance + SEO
// ---------------------------------------------------------------------
section('3. Lighthouse (mobile)')
try {
  const chrome = await launch({ chromeFlags: ['--headless'] })
  try {
    const result = await lighthouse(netlifyUrl, {
      port: chrome.port,
      output: 'json',
      onlyCategories: ['performance', 'seo'],
      formFactor: 'mobile',
      screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 3 },
    })
    const { performance, seo } = result.lhr.categories
    const perfScore = Math.round(performance.score * 100)
    const seoScore = Math.round(seo.score * 100)
    console.log(`  Performance: ${perfScore}/100`)
    console.log(`  SEO:         ${seoScore}/100`)
    if (perfScore < 50) fail('Performance score', `${perfScore}/100 is low`)
    if (seoScore < 90) fail('SEO score', `${seoScore}/100 is low`)
  } finally {
    await chrome.kill()
  }
} catch (err) {
  fail('Lighthouse run', err.message)
}

// ---------------------------------------------------------------------
// 4. SSL certificate on the custom domain
// ---------------------------------------------------------------------
section(`4. SSL certificate on ${domainUrl}`)
await new Promise((resolve) => {
  const { hostname } = new URL(domainUrl)
  const socket = tls.connect(
    { host: hostname, port: 443, servername: hostname, timeout: 8000 },
    () => {
      const cert = socket.getPeerCertificate()
      if (socket.authorized && cert && Object.keys(cert).length > 0) {
        const validTo = new Date(cert.valid_to)
        ok(`Certificate valid, issued to ${cert.subject?.CN ?? hostname}, expires ${validTo.toISOString().slice(0, 10)}`)
      } else {
        fail('Certificate valid', socket.authorizationError || 'not authorized')
      }
      socket.end()
      resolve()
    },
  )
  socket.on('error', (err) => {
    fail('SSL connection', `${hostname} — ${err.message} (expected until the domain is purchased and DNS/SSL is provisioned)`)
    resolve()
  })
  socket.on('timeout', () => {
    fail('SSL connection', `${hostname} timed out`)
    socket.destroy()
    resolve()
  })
})

// ---------------------------------------------------------------------
// 5. Custom domain resolves and loads correctly
// ---------------------------------------------------------------------
section(`5. Custom domain loads (${domainUrl})`)
try {
  const res = await fetch(domainUrl)
  const html = await res.text()
  if (res.ok) ok(`GET ${domainUrl} → ${res.status}`)
  else fail(`GET ${domainUrl}`, `status ${res.status}`)
  if (html.includes('BUGS')) ok('Custom domain serves the same site content')
  else fail('Custom domain serves the same site content', 'expected content not found')
} catch (err) {
  fail('Fetch custom domain', `${err.message} (expected until the domain is purchased and deployed)`)
}

// ---------------------------------------------------------------------
console.log(`\n${failures === 0 ? '\x1b[32mAll checks passed.' : `\x1b[31m${failures} check(s) failed.`}\x1b[0m`)
process.exit(failures === 0 ? 0 : 1)
