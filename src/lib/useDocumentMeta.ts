import { useEffect } from 'react'
import { SITE_URL } from './businessInfo'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export interface DocumentMetaOptions {
  title: string
  description: string
  path: string
  /** Set for pages that shouldn't be indexed (e.g. the 404 page). */
  noindex?: boolean
}

/**
 * Sets per-route <title>, description, canonical, and OG/Twitter tags.
 *
 * Needed because this is a client-rendered SPA: the raw index.html only has
 * one static head, so every route would otherwise share the homepage's
 * title/canonical — both in the browser during client-side navigation and,
 * more importantly, in the per-route prerendered HTML crawlers see
 * (scripts/prerender.mjs snapshots the DOM after this effect has run).
 */
export function useDocumentMeta({ title, description, path, noindex }: DocumentMetaOptions) {
  useEffect(() => {
    const url = new URL(path, SITE_URL).toString()
    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex' : 'index, follow')
  }, [title, description, path, noindex])
}
