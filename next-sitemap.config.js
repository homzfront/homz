module.exports = {
  siteUrl: 'http://www.homz.ng',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'BadBot', disallow: '/' },
    ],
  },
}