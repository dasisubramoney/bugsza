import type { Context } from 'https://edge.netlify.com'

// Adds X-Robots-Tag: noindex only when the request came in on the default
// *.netlify.app subdomain, never on the custom domain (bugsza.co.za). A
// static netlify.toml [[headers]] rule can't do this — headers rules apply
// to the deploy regardless of which hostname served the request, since both
// the netlify.app URL and the custom domain point to the same build. Only a
// per-request check of the request's hostname (this edge function) can tell
// them apart.
export default async (request: Request, context: Context) => {
  const response = await context.next()
  const { hostname } = new URL(request.url)

  if (hostname.endsWith('.netlify.app')) {
    const headers = new Headers(response.headers)
    headers.set('X-Robots-Tag', 'noindex')
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  }

  return response
}

export const config = { path: '/*' }
