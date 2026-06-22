import { fetchPropertyListedAll } from "@/api/propertyService";


export default async function sitemap() {

  const baseUrl = "https://www.homz.ng";


  let properties = [];

  try {

    const response = await fetchPropertyListedAll();

    properties = response?.data || response || [];

  } catch (error) {

    console.log("Sitemap property fetch error:", error);

  }


  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },

    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      priority: 0.8,
    },

    {
      url: `${baseUrl}/contact-page`,
      lastModified: new Date(),
      priority: 0.8,
    },

    {
      url: `${baseUrl}/rent`,
      lastModified: new Date(),
      priority: 0.8,
    },

    {
      url: `${baseUrl}/sales/lagos`,
      lastModified: new Date(),
      priority: 0.8,
    },

    {
      url: `${baseUrl}/land/lagos`,
      lastModified: new Date(),
      priority: 0.8,
    },

    {
      url: `${baseUrl}/enterprise`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ];


  const propertyPages = properties.map((property) => ({
    url: `${baseUrl}/property/${property.id}`,
    lastModified: new Date(
      property.updatedAt || Date.now()
    ),
    priority: 0.7,
  }));


  return [
    ...staticPages,
    ...propertyPages,
  ];

}