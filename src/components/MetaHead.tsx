import Head from 'next/head'

import { HOME, META_IMAGE } from 'constants/paths'
import { BRAND, BRAND_TAGLINE, BRAND_TAGLINE_LONG } from 'constants/texts'

export function MetaHead() {
  return (
    <Head>
      <title>{`${BRAND} | ${BRAND_TAGLINE}`}</title>
      <meta name="description" content={BRAND_TAGLINE_LONG} key="description" />

      <link rel="icon" type="image/png" sizes="32x32" href="/square/ksana-32x32.png" />

      <meta name="theme-color" content="#ED8936" />
      <link rel="manifest" href="/manifest.json" />

      <meta property="og:site_name" content={`${BRAND} | ${BRAND_TAGLINE}`} />
      <meta key="og-image" property="og:image" content={`${HOME}${META_IMAGE}`} />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="640" />
      <meta property="article:author" content={'mazipanneh'} />
      <meta property="og:type" content="article" />
      <meta key="og-title" property="og:title" content={`${BRAND} | ${BRAND_TAGLINE}`} />
      <meta key="og-description" property="og:description" content={BRAND_TAGLINE_LONG} />
      <meta key="og-url" property="og:url" content={`${HOME}`} />

      <meta key="tw-image" name="twitter:image" content={`${HOME}${META_IMAGE}`} />
      <meta name="twitter:image:width" content="1280" />
      <meta name="twitter:image:height" content="640" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta key="tw-title" name="twitter:title" content={`${BRAND} | ${BRAND_TAGLINE}`} />
      <meta key="tw-description" name="twitter:description" content={BRAND_TAGLINE_LONG} />
      <meta key="tw-url" name="twitter:url" content={`${HOME}`} />
      <meta name="twitter:creator" content={'@maz_ipan'} />
    </Head>
  )
}
