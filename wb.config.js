module.exports = {
  swDest: 'static/service-worker.js',
  runtimeCaching: [
    {
      urlPattern: /.(png|jpg|jpeg|webp|svg)$/,
      handler: 'CacheFirst'
    },
    {
      urlPattern: /.(js|css)$/,
      handler: 'StaleWhileRevalidate'
    },
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200
        }
      }
    }
  ]
}
