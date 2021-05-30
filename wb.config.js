module.exports = {
  dest: 'public',
  register: true,
  scope: '/',
  sw: 'service-worker.js',
  runtimeCaching: [
    {
      urlPattern: /.(png|jpg|jpeg|webp|svg)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'assets',
        expiration: {
          maxEntries: 200
        }
      }
    },
    {
      urlPattern: /.(js|css)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'js-css',
        expiration: {
          maxEntries: 200
        }
      }
    }
  ]
}
