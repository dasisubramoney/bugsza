/**
 * Single source of truth for confirmed business facts, used by structured
 * data, meta tags, and generated files (sitemap, llms.txt). Every value here
 * must trace back to a fact confirmed for this build — do not add fields
 * that aren't confirmed; leave them out and flag instead of guessing.
 */
export const BUSINESS_NAME = 'BUGS'
export const BUSINESS_FULL_NAME = 'BUGS — Back Up Gate Solution'
export const NICHE_DESCRIPTION =
  'Portable 12V/24V DC backup power for gate & garage motors'

// TODO: domain confirmed as available (bugsza.co.za) but not yet purchased —
// this URL will not resolve until the domain is bought and the site is
// deployed to it. Every reference below is written for launch-day, not today.
export const SITE_URL = 'https://bugsza.co.za'

export const PHONE_DISPLAY = '078 362 8387'
export const PHONE_E164 = '+27783628387'
// Used in structured data and llms.txt, which display the number spaced —
// keep this in sync with any other on-page display of the phone number.
export const PHONE_E164_SPACED = '+27 78 362 8387'
export const WHATSAPP_URL = 'https://wa.me/27783628387'

export const SERVICE_AREA = 'Greater Johannesburg'

export const HOURS_DISPLAY = 'Mon–Fri, 8am–5pm'
export const HOURS_SCHEMA = {
  dayOfWeek: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ],
  opens: '08:00',
  closes: '17:00',
}

export const PRICE_ZAR = 4500
export const PRICE_DISPLAY = 'R4,500'
export const PRICE_NOTE = 'Subject to change'
export const DELIVERY_NOTE = 'Delivery: subject to locality'
export const CALLOUT_FEE_DISPLAY =
  'R650/hour, based on your location. Final cost may vary with distance and site conditions.'
// The unit price never includes installation — every mention of R4,500
// must make that explicit, since installation is billed separately at the
// callout rate above.
export const INSTALL_NOT_INCLUDED_NOTE =
  'Price is for the unit only. Installation is billed separately at the callout rate.'

// No fixed address — mobile install service. Deliberately no `address`
// field anywhere in structured data; do not fabricate one.
export const HAS_FIXED_ADDRESS = false
