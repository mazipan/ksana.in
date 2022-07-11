/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://ksana.in',
  generateRobotsTxt: false,
  sitemapSize: 100,
  exclude: ['/callback', '/dashboard', '/auth/set-new-password']
}

module.exports = config
