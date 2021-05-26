const withOffline = require('next-offline')

const workboxConfig = require('./wb.config')

module.exports = withOffline({
  future: {
    webpack5: true
  },
  images: {
    deviceSizes: [420, 768, 1024, 1200],
    iconSizes: [],
    domains: [],
    path: '/_next/image',
    loader: 'default'
  },
  workboxOpts: workboxConfig
})
