import Head from 'next/head'

import { HOME, META_IMAGE } from 'constants/paths'
import { BRAND, BRAND_TAGLINE, BRAND_TAGLINE_LONG } from 'constants/texts'

import { makeWebsiteSchema } from '../StructuredData/Website'
import { makeLogoSchema } from '../StructuredData/Logo'

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
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
      <meta name="robots" content={robots} />
      <title>{title}</title>
      <meta name="description" content={description} key="description" />

      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://cdn.splitbee.io" />

      <link rel="apple-touch-icon" sizes="57x57" href="/images/favicon/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/images/favicon/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/images/favicon/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/images/favicon/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/images/favicon/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/images/favicon/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/images/favicon/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/images/favicon/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-icon-180x180.png" />

      <link
        rel="icon"
        type="image/png"
        sizes="48x48"
        href="/images/favicon/android-icon-48x48.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/images/favicon/android-icon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="144x96"
        href="/images/favicon/android-icon-144x144.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/images/favicon/android-icon-192x192.png"
      />

      <meta name="msapplication-TileColor" content="#ED8936" />
      <meta name="msapplication-TileImage" content="/images/favicon/ms-icon-144x144.png" />

      <meta name="theme-color" content="#ED8936" />
      <link rel="manifest" href="/manifest.json" />
      
      <meta name="yandex-verification" content="f7aa4dd770d17d3e" />
      
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

      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Work+Sans&display=swap"
        rel="stylesheet"
      />

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
