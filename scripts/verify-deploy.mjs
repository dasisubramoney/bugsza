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
//   0. Commit verification: dist/build-commit.txt on the live site matches
//      `git rev-parse HEAD` — runs first and skips every other check on
//      mismatch, since a stale deploy makes the rest meaningless
//   1. Raw HTML (no JS execution) contains real page content
//   2. /robots.txt, /sitemap.xml, /llms.txt all return 200 with expected content
//   3. Lighthouse mobile performance + SEO scores (3-1, 3-2), plus the
//      X-Robots-Tag: noindex header on the *.netlify.app subdomain (3-3)
//   4. SSL certificate on the custom domain is issued and valid
//   5. The custom domain resolves and loads correctly (not just *.netlify.app)
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
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
// 0. Commit verification — must run first. Every other check reads
// whatever the live site currently serves; if that's a stale deploy, a
// pass on those checks just means the *previous* build was fine, which
// isn't what's being verified. Fail loudly with both values and skip the
// rest rather than let a stale deploy produce misleadingly green output.
// ---------------------------------------------------------------------
section('0. Commit verification (deploy freshness)')
const COMMIT_HASH_RE = /^[0-9a-f]{40}$/
const { stdout: localCommitRaw } = await execFileAsync('git', ['rev-parse', 'HEAD'])
const localCommit = localCommitRaw.trim()
let deployIsFresh = false
try {
  const buildCommitUrl = new URL('/build-commit.txt', netlifyUrl).toString()
  const res = await fetch(buildCommitUrl)
  const deployedCommit = (await res.text()).trim()
  if (res.ok && deployedCommit === localCommit) {
    ok(`Deployed commit matches local HEAD`)
    console.log(`    ${localCommit}`)
    deployIsFresh = true
  } else {
    // If build-commit.txt 404s, Netlify's SPA-fallback redirect serves the
    // full homepage HTML instead — dumping that raw would bury the one
    // fact that matters, so summarize anything that isn't a plain commit
    // hash rather than printing it verbatim.
    const deployedDisplay = COMMIT_HASH_RE.test(deployedCommit)
      ? deployedCommit
      : `(not a commit hash — ${deployedCommit.length} bytes starting with ${JSON.stringify(deployedCommit.slice(0, 40))}${deployedCommit.length > 40 ? '…' : ''}; likely the SPA-fallback page, meaning build-commit.txt doesn't exist on this deploy)`
    fail(`Deployed commit matches local HEAD`)
    console.log(`    deployed (${buildCommitUrl}, HTTP ${res.status}): ${deployedDisplay}`)
    console.log(`    local    (git rev-parse HEAD):                   ${localCommit}`)
  }
} catch (err) {
  fail('Fetch build-commit.txt', err.message)
  console.log(`    local (git rev-parse HEAD): ${localCommit}`)
}

if (!deployIsFresh) {
  console.log(
    `\n\x1b[31mStale or unverifiable deploy — skipping all remaining checks. Their results would be meaningless against a build that doesn't match what's actually deployed.\x1b[0m`,
  )
  console.log(`\n\x1b[31m${failures} check(s) failed.\x1b[0m`)
  process.exit(1)
}

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
      if (bodyOnly.includes('R 4,500.00') || bodyOnly.includes('Centurion')) {
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

// Best-effort, human-readable reason a given Lighthouse audit failed.
// Most binary SEO audits set `explanation`; when they don't, fall back to
// summarizing `details.items` (the table Lighthouse shows in its report),
// and finally to the audit's own description as a last resort.
function describeAuditFailure(audit) {
  if (audit.explanation) return audit.explanation
  const items = audit.details?.items
  if (Array.isArray(items) && items.length > 0) {
    const parts = items
      .slice(0, 3)
      .map((item) => {
        if (typeof item === 'string') return item
        return item.text || item.href || item.url || item.node?.snippet || JSON.stringify(item)
      })
    const more = items.length > 3 ? ` (+${items.length - 3} more)` : ''
    return `${parts.join('; ')}${more}`
  }
  return audit.description?.split('\n')[0] ?? 'no additional detail available'
}

// ---------------------------------------------------------------------
// 3. Lighthouse — mobile performance + SEO, plus the noindex header
// ---------------------------------------------------------------------
section('3. Lighthouse (mobile) + noindex header')

// chrome-launcher defaults to a random folder under the OS temp dir
// (`%TEMP%\lighthouse.<random>`) as Chrome's user-data-dir, then deletes it
// on kill() via rmSync. On Windows that delete routinely fails with EPERM
// (AV/indexer still holding a handle on a file Chrome just closed), which
// crashes the whole script. Passing an explicit userDataDir avoids both
// problems: it's a stable project-local folder instead of the OS temp dir,
// and chrome-launcher's own cleanup code skips deleting a caller-supplied
// dir entirely, so there's nothing left to EPERM on.
const chromeProfileDir = resolve('.lighthouse-chrome-profile')
mkdirSync(chromeProfileDir, { recursive: true })

try {
  const chrome = await launch({ chromeFlags: ['--headless'], userDataDir: chromeProfileDir })
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

    console.log('\n  3-1: Performance (mobile)')
    console.log(`    Score: ${perfScore}/100`)
    if (perfScore < 50) fail('Performance score', `${perfScore}/100 is low`)
    else ok(`Performance score ${perfScore}/100`)

    console.log('\n  3-2: SEO (mobile) — full audit breakdown')
    console.log(`    Score: ${seoScore}/100`)
    for (const ref of seo.auditRefs) {
      const audit = result.lhr.audits[ref.id]
      if (!audit || audit.scoreDisplayMode === 'notApplicable' || audit.scoreDisplayMode === 'manual') continue
      if (audit.score === 1) {
        ok(`SEO: ${audit.title}`)
      } else {
        fail(`SEO: ${audit.title}`, describeAuditFailure(audit))
      }
    }
    if (seoScore < 90) fail('SEO score', `${seoScore}/100 is low`)
  } finally {
    await chrome.kill()
  }
} catch (err) {
  fail('Lighthouse run', err.message)
}

console.log('\n  3-3: noindex header on netlify.app subdomain')
const NETLIFY_SUBDOMAIN_URL = 'https://bugsza.netlify.app/'
try {
  const res = await fetch(NETLIFY_SUBDOMAIN_URL)
  const header = res.headers.get('x-robots-tag')
  if (header === 'noindex') {
    ok(`${NETLIFY_SUBDOMAIN_URL} → X-Robots-Tag: noindex`)
  } else {
    fail(`${NETLIFY_SUBDOMAIN_URL} → X-Robots-Tag: noindex`, `got "${header ?? '(header missing)'}"`)
  }
} catch (err) {
  fail(`Fetch ${NETLIFY_SUBDOMAIN_URL}`, err.message)
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
