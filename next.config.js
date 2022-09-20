const withPWA = require('next-pwa')

const workboxConfig = require('./wb.config')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withPWA({
  swcMinify: true,
  images: {
    minimumCacheTTL: 31536000,
    deviceSizes: [420, 1024],
    domains: [],
    path: '/_next/image',
    loader: 'default'
  },
  pwa: process.env.NODE_ENV === 'development' ? null : workboxConfig,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, stream: false, constants: false }

    return config
  }
})

module.exports = nextConfig
