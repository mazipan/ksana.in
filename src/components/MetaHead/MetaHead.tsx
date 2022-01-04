import Head from 'next/head'

import { makeWebsiteSchema } from '../StructuredData/Website'
import { makeLogoSchema } from '../StructuredData/Logo'
import { HOME, META_IMAGE } from 'constants/paths'
import { BRAND, BRAND_TAGLINE, BRAND_TAGLINE_LONG } from 'constants/texts'

export const INDEXED = 'index,follow'
export const NO_INDEXED = 'noindex,nofollow'

export function MetaHead({
  title = `${BRAND_TAGLINE} | ${BRAND}`,
  description = BRAND_TAGLINE_LONG,
  url = HOME,
  image = `${HOME}${META_IMAGE}`,
  robots = INDEXED
}) {
  return (
    <Head>
      <meta name="robots" content={robots} />
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <meta property="article:author" content={'mazipanneh'} />

      <meta property="og:site_name" content={BRAND} />
      <meta key="og-image" property="og:image" content={image} />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="640" />
      <meta property="og:type" content="article" />
      <meta key="og-title" property="og:title" content={title} />
      <meta key="og-description" property="og:description" content={description} />
      <meta key="og-url" property="og:url" content={url} />

      <meta key="tw-image" name="twitter:image" content={image} />
      <meta name="twitter:image:width" content="1280" />
      <meta name="twitter:image:height" content="640" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta key="tw-title" name="twitter:title" content={title} />
      <meta key="tw-description" name="twitter:description" content={description} />
      <meta key="tw-url" name="twitter:url" content={url} />
      <meta name="twitter:creator" content={'@maz_ipan'} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(makeWebsiteSchema()) }}
      ></script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(makeLogoSchema()) }}
      ></script>
    </Head>
  )
}
