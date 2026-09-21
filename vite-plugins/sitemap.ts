import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import { ROUTES } from '../src/lib/routes.ts'

const SITE_URL = 'https://bugsza.co.za'

/**
 * Writes sitemap.xml into the build output on every `vite build`, so it's
 * always generated from the current route list rather than hand-maintained.
 * Anchor sections within the homepage (#faq, #pricing, etc.) aren't
 * separate pages and don't belong in a sitemap — only real routes do.
 */
export function sitemapPlugin(): Plugin {
  return {
    name: 'generate-sitemap',
    apply: 'build',
    closeBundle() {
      const lastmod = new Date().toISOString().slice(0, 10)
      const urls = ROUTES.map((path) => {
        const loc = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
        const priority = path === '/' ? '1.0' : '0.7'
        return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`
      }).join('\n')

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
      writeFileSync(resolve('dist/sitemap.xml'), xml, 'utf-8')
    },
  }
}
