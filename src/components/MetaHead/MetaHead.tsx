import Head from 'next/head'

import { HOME, META_IMAGE } from 'constants/paths'
import { BRAND, BRAND_TAGLINE, BRAND_TAGLINE_LONG } from 'constants/texts'

import { makeSchema } from '../StructuredData/Website'

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
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <meta name="robots" content={robots} />
      <title>{title}</title>
      <meta name="description" content={description} key="description" />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${HOME}images/square/ksana-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="64x64"
        href={`${HOME}images/square/ksana-64x64.png`}
      />
      <link rel="shortcut icon" href={`${HOME}images/square/ksana-64x64.png`} />

      <meta name="theme-color" content="#ED8936" />
      <link rel="manifest" href="/manifest.json" />

      <meta property="og:site_name" content={BRAND} />
      <meta key="og-image" property="og:image" content={image} />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="640" />
      <meta property="article:author" content={'mazipanneh'} />
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(makeSchema()) }}
      ></script>
    </Head>
  )
}
