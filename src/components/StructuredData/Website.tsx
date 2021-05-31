import { HOME, META_ICON, META_THUMBNAIL } from 'constants/paths'
import { BRAND, BRAND_TAGLINE_LONG } from 'constants/texts'

export function makeSchema() {
  return {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: `${HOME}`,
    description: BRAND_TAGLINE_LONG,
    image: META_ICON,
    thumbnailUrl: META_THUMBNAIL,
    name: BRAND,
    sameAs: [
      'https://www.facebook.com/mazipanneh',
      'https://instagram.com/maz_ipan',
      'https://twitter.com/Maz_Ipan',
      'https://id.linkedin.com/in/mazipan',
      'https://www.slideshare.net/IrfanMaulana21',
      'https://github.com/mazipan'
    ]
  }
}
