import type { Plugin } from 'vite'

/**
 * Preloads the font file that renders the hero H1 (the LCP element on
 * every route — confirmed via Lighthouse's LCP breakdown insight), so the
 * browser can start fetching it in parallel with the CSS request instead
 * of waiting for the CSS to parse and discover the @font-face src. Only
 * the one weight/subset actually needed for above-the-fold text is
 * preloaded — adding more would just add early bandwidth contention.
 */
export function preloadCriticalFontPlugin(): Plugin {
  return {
    name: 'preload-critical-font',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle
        if (!bundle) return html

        const asset = Object.values(bundle).find(
          (item) =>
            item.type === 'asset' &&
            item.fileName.endsWith('.woff2') &&
            item.fileName.includes('archivo-black-latin-400-normal'),
        )
        if (!asset) return html

        const preloadTag = `<link rel="preload" as="font" type="font/woff2" href="/${asset.fileName}" crossorigin />`
        return html.replace('</head>', `    ${preloadTag}\n  </head>`)
      },
    },
  }
}
