import { HOME, META_ICON, META_IMAGE } from 'constants/paths'
import { BRAND, BRAND_TAGLINE_LONG } from 'constants/texts'

export function makeWebsiteSchema() {
  return {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: `${HOME}`,
    description: BRAND_TAGLINE_LONG,
    image: META_ICON,
    thumbnailUrl: META_IMAGE,
    name: BRAND,
    sameAs: [
      'https://www.facebook.com/mazipanneh',
      'https://instagram.com/maz_ipan',
      'https://twitter.com/maz_ipan',
      'https://www.linkedin.com/in/mazipan/',
      'https://www.slideshare.net/IrfanMaulana21',
      'https://github.com/mazipan'
    ]
  }
}
