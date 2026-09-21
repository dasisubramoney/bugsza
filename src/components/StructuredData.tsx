import {
  BUSINESS_FULL_NAME,
  BUSINESS_NAME,
  HOURS_SCHEMA,
  NICHE_DESCRIPTION,
  PHONE_E164_SPACED,
  PRICE_ZAR,
  SERVICE_AREA,
  SITE_URL,
} from '../lib/businessInfo'

/**
 * Homepage structured data: one `LocalBusiness` block for the business
 * itself, and a separate `Product` block for the unit it sells. Kept apart
 * deliberately — the business offers installation as a separate billed
 * service (see the callout fee), so the unit's price belongs on the
 * Product/Offer, not folded into the business listing.
 *
 * No `address` field on LocalBusiness: confirmed as a mobile install
 * service with no fixed address. No `sameAs`, `aggregateRating`, or
 * `image`: those facts were never confirmed, so they're omitted rather
 * than guessed.
 */
const LOCAL_BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: BUSINESS_NAME,
  alternateName: BUSINESS_FULL_NAME,
  description: NICHE_DESCRIPTION,
  url: SITE_URL,
  telephone: PHONE_E164_SPACED,
  areaServed: {
    '@type': 'City',
    name: SERVICE_AREA,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: HOURS_SCHEMA.dayOfWeek,
    opens: HOURS_SCHEMA.opens,
    closes: HOURS_SCHEMA.closes,
  },
}

// schema.org's Product type has no direct `price`/`priceCurrency`
// properties — they belong on a nested `Offer` under `offers`. This price
// is for the unit only; it does not include installation.
const PRODUCT_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: BUSINESS_NAME,
  description: NICHE_DESCRIPTION,
  offers: {
    '@type': 'Offer',
    price: String(PRICE_ZAR),
    priceCurrency: 'ZAR',
  },
}

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_JSON_LD) }}
      />
    </>
  )
}
