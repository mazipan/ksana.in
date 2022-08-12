const withPWA = require('next-pwa')

const workboxConfig = require('./wb.config')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withPWA({
  images: {
    deviceSizes: [420, 1024],
    domains: [],
    path: '/_next/image',
    loader: 'default'
  },
  pwa: workboxConfig
})

module.exports = nextConfig
