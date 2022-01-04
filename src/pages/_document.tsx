import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

import theme from '../theme'

class Document extends NextDocument {
  render() {
    return (
      <Html lang="id">
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://cdn.splitbee.io" />

          <link rel="apple-touch-icon" sizes="57x57" href="/images/favicon/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/images/favicon/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/images/favicon/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/images/favicon/apple-icon-76x76.png" />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/images/favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/images/favicon/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/images/favicon/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/images/favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/favicon/apple-icon-180x180.png"
          />
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
          <meta name="yandex-verification" content="f7aa4dd770d17d3e" />
          <link rel="manifest" href="/manifest.json" />

          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Work+Sans&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
