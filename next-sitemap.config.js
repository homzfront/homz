const STATES = [
  "lagos",
  "oyo",
  "calabar",
  "edo",
  "kwara",
  "kano",
  "abuja",
  "ondo",
  "port-harcourt",
];

// Keep in sync with src/utils/urlParamsParser.js's propertyTypeMapping keys
const PROPERTY_TYPE_SLUGS = [
  "boys-quarters",
  "mini-flat",
  "penthouse",
  "self-contain",
  "studio-apartment",
  "block-of-flats",
  "detached-bungalow",
  "semi-detached-bungalow",
  "terraced-bungalow",
  "detached-duplex",
  "semi-detached-duplex",
  "terraced-duplex",
];

const LISTING_BASE_PATHS_WITH_TYPE = ["rent", "sales", "shortlet"];

module.exports = {
  siteUrl: 'https://www.homz.ng',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,

  // These are internal /src/pages component fragments that Next's Pages Router
  // auto-registers as real routes (e.g. /dashboard/owner/components/box). They
  // have no real content and should never be listed in the sitemap.
  exclude: [
    '/dashboard/**',
    '/landingPageProMan/**',
    '/landingPageProOwn/**',
    '/landingPageTenant/**',
    '/pricingPlan/**',
    '/plan/**',
    '/selectStateAndArea/**',
    '/tenantManagementPlan/**',
    '/aboutUs/**',
    '/contactPage/**',
    // Already noindex'd at the page level — excluded here too for sitemap hygiene
    '/login',
    '/register',
    '/forgetpassword',
    '/forgetpassword/**',
    '/verify-email',
    '/select-plan',
    '/switch-profile',
    '/second-invite-landlord',
    '/know-tenant',
    '/tenant-creation',
    '/property-owner-account-creation',
    '/plans',
  ],

  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'BadBot', disallow: '/' },
      {
        // Block crawling of the junk /pages component-fragment routes outright —
        // unlike the private app pages above, these have no noindex tag and
        // never should be crawled at all, so a hard disallow is correct here.
        userAgent: '*',
        disallow: [
          '/dashboard',
          '/landingPageProMan',
          '/landingPageProOwn',
          '/landingPageTenant',
          '/pricingPlan',
          '/plan',
          '/selectStateAndArea',
          '/tenantManagementPlan',
          '/aboutUs',
          '/contactPage',
        ],
      },
    ],
  },

  // next-sitemap can't discover dynamic [location]/[propertyType] routes on its
  // own since they have no static params at build time — inject them manually.
  additionalPaths: async (config) => {
    const result = [];

    for (const basePath of [...LISTING_BASE_PATHS_WITH_TYPE, 'land']) {
      for (const state of STATES) {
        result.push(await config.transform(config, `/${basePath}/${state}`));
      }
    }

    for (const basePath of LISTING_BASE_PATHS_WITH_TYPE) {
      for (const state of STATES) {
        for (const propertyType of PROPERTY_TYPE_SLUGS) {
          result.push(
            await config.transform(config, `/${basePath}/${state}/${propertyType}`)
          );
        }
      }
    }

    return result;
  },
};