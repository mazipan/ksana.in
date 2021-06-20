import { HOME, META_ICON } from 'constants/paths'

export function makeLogoSchema() {
  return {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    url: `${HOME}`,
    logo: META_ICON
  }
}
