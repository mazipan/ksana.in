const withPWA = require('next-pwa')

const workboxConfig = require('./wb.config')

module.exports = withPWA({
  images: {
    deviceSizes: [420, 1024],
    iconSizes: [],
    domains: [],
    path: '/_next/image',
    loader: 'default'
  },
  pwa: workboxConfig
})
