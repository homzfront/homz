import { PROPERTY_TYPE_SLUGS } from "@/utils/urlParamsParser";

const BASE_URL = "https://www.homz.ng";

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

const LISTING_BASE_PATHS_WITH_TYPE = ["rent", "sales", "shortlet"];

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    { url: `${BASE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/about-us`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact-page`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/enterprise`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms-and-conditions`, changeFrequency: "yearly", priority: 0.3 },
  ].map((entry) => ({ ...entry, lastModified: now }));

  const baseListingPages = [...LISTING_BASE_PATHS_WITH_TYPE, "land"].map((basePath) => ({
    url: `${BASE_URL}/${basePath}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.9,
  }));

  const allPropertiesPage = [
    {
      url: `${BASE_URL}/all`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const locationListingPages = [...LISTING_BASE_PATHS_WITH_TYPE, "land"].flatMap((basePath) =>
    STATES.map((state) => ({
      url: `${BASE_URL}/${basePath}/${state}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    }))
  );

  const locationPropertyTypePages = LISTING_BASE_PATHS_WITH_TYPE.flatMap((basePath) =>
    STATES.flatMap((state) =>
      PROPERTY_TYPE_SLUGS.map((propertyType) => ({
        url: `${BASE_URL}/${basePath}/${state}/${propertyType}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      }))
    )
  );

  return [
    ...staticPages,
    ...baseListingPages,
    ...allPropertiesPage,
    ...locationListingPages,
    ...locationPropertyTypePages,
  ];
}