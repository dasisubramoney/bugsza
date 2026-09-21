/**
 * Every route src/App.tsx serves. Single source of truth for the sitemap
 * generator and the build-time prerender script — add a route here when
 * adding one to App.tsx, not separately in each of those.
 */
export const ROUTES = ['/', '/going-smart', '/innovation-centre'] as const
