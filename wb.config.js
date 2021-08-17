module.exports = {
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  register: true,
  scope: '/',
  sw: 'service-worker.js',
  buildExcludes: ['/robots.txt', '/sitemap.xml', '/google254ec9b78a3c3c38.html', /\/images\/.*$/],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/oirhwazlkofldqlyoamp\.supabase\.co\//,
      handler: 'NetworkFirst'
    },
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts-stylesheets'
      }
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 200
        }
      }
    },
    {
      urlPattern: /.(png|jpg|jpeg|webp|svg|woff|woff2)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'assets',
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 200
        }
      }
    },
    {
      urlPattern: /.(js|css)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'js-css'
      }
    }
  ]
}
