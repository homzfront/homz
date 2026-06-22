/**
 * Utility functions for parsing URL parameters and converting them to search filters
 */

/**
 * Maps URL slugs to proper property types
 */
const propertyTypeMapping = {
  'boys-quarters': 'boys quarters',
  'mini-flat': 'mini-flat',
  'penthouse': 'penthouse',
  'self-contain': 'self contain',
  'studio-apartment': 'studio apartment',
  'block-of-flats': 'block of flats',
  'detached-bungalow': 'detached bungalow',
  'semi-detached-bungalow': 'semi-detached bungalow',
  'terraced-bungalow': 'terraced bungalow',
  'detached-duplex': 'detached duplex',
  'semi-detached-duplex': 'semi-detached duplex',
  'terraced-duplex': 'terraced duplex',
};

/**
 * Maps listing type paths to filter values
 */
const listingTypeMapping = {
  'rent': 'for rent',
  'sales': 'for sale',
  'land': 'land',
  'shortlet': 'shortlet',
};

export const PROPERTY_TYPE_SLUGS = Object.keys(propertyTypeMapping);
/**
 * {label, slug} pairs for rendering "Popular searches" links on location pages,
 * e.g. /rent/abuja showing links to /rent/abuja/mini-flat, /rent/abuja/self-contain, etc.
 */
export const PROPERTY_TYPE_LINKS = PROPERTY_TYPE_SLUGS.map((slug) => ({
  slug,
  label: propertyTypeMapping[slug].replace(/\b\w/g, (c) => c.toUpperCase()),
}));

/**
 * Converts URL slug to proper case for location
 * @param {string} locationSlug - URL slug for location (e.g., 'lagos', 'abuja')
 * @returns {string} - Properly formatted location (e.g., 'Lagos', 'Abuja')
 */
export const parseLocation = (locationSlug) => {
  if (!locationSlug) return '';
  
  // Capitalize first letter and handle multiple words
  return locationSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Converts URL slug to property type
 * @param {string} propertyTypeSlug - URL slug for property type (e.g., 'mini-flat')
 * @returns {string} - Proper property type (e.g., 'mini flat')
 */
export const parsePropertyType = (propertyTypeSlug) => {
  if (!propertyTypeSlug) return null;
  return propertyTypeMapping[propertyTypeSlug.toLowerCase()] || propertyTypeSlug.replace(/-/g, ' ');
};

/**
 * Converts listing type path to filter value
 * @param {string} listingType - URL path segment (e.g., 'rent', 'sales')
 * @returns {string} - Filter value (e.g., 'for rent', 'for sale')
 */
export const parseListingType = (listingType) => {
  if (!listingType) return null;
  
  return listingTypeMapping[listingType.toLowerCase()] || listingType;
};

/**
 * Parses URL parameters and returns filter object
 * @param {object} params - Next.js params object
 * @param {string} basePath - Base path (rent, sales, land, shortlet)
 * @returns {object} - Filter object for property store
 */
export const parseUrlToFilters = (params, basePath) => {
  const filters = {
    search: '',
    propertyType: null,
    minPrice: null,
    maxPrice: null,
    numberOfBathrooms: null,
    listingType: parseListingType(basePath),
  };

  // Parse location from params
  if (params.location) {
    filters.search = parseLocation(params.location);
  }

  // Parse property type from params
  if (params.propertyType) {
    filters.propertyType = parsePropertyType(params.propertyType);
  }

  return filters;
};

/**
 * Generates page metadata based on URL parameters
 * @param {object} params - Next.js params object
 * @param {string} basePath - Base path (rent, sales, land, shortlet)
 * @returns {object} - Metadata object
 */
export const generatePageMetadata = (params, basePath) => {
  const location = params?.location ? parseLocation(params.location) : '';
  const rawType = params?.propertyType ? parsePropertyType(params.propertyType) : '';
  const propertyType = rawType ? rawType.replace(/\b\w/g, (c) => c.toUpperCase()) : '';
  const pluralType = propertyType.endsWith('s') ? propertyType : `${propertyType}s`;

  const copy = {
    rent: {
      withTypeLocation: {
        title: `${pluralType} for Rent in ${location} | Homz.ng`,
        description: `Browse verified ${rawType}s for rent in ${location}, Nigeria. Compare prices and photos, and reach landlords directly on Homz.ng.`,
      },
      withLocation: {
        title: `Houses & Apartments for Rent in ${location} | Homz.ng`,
        description: `Find verified houses, flats and apartments for rent in ${location}, Nigeria. Transparent pricing and direct landlord contact on Homz.ng.`,
      },
      base: {
        title: 'Houses & Apartments for Rent in Nigeria | Homz.ng',
        description: 'Browse verified houses, flats and apartments for rent across Nigeria. Transparent pricing and direct landlord contact on Homz.ng.',
      },
    },
    sales: {
      withTypeLocation: {
        title: `${pluralType} for Sale in ${location} | Homz.ng`,
        description: `Browse verified ${rawType}s for sale in ${location}, Nigeria. Compare prices and photos on Homz.ng, Nigeria's trusted property platform.`,
      },
      withLocation: {
        title: `Properties for Sale in ${location} | Homz.ng`,
        description: `Find verified houses, flats and duplexes for sale in ${location}, Nigeria. Transparent pricing on Homz.ng.`,
      },
      base: {
        title: 'Properties for Sale in Nigeria | Homz.ng',
        description: 'Browse verified houses, flats and duplexes for sale across Nigeria. Transparent pricing on Homz.ng.',
      },
    },
    land: {
      withTypeLocation: {
        title: `${pluralType} Land for Sale in ${location} | Homz.ng`,
        description: `Browse verified ${rawType} land for sale in ${location}, Nigeria on Homz.ng.`,
      },
      withLocation: {
        title: `Land for Sale in ${location} | Homz.ng`,
        description: `Find verified plots of land for sale in ${location}, Nigeria. Transparent pricing and direct seller contact on Homz.ng.`,
      },
      base: {
        title: 'Land for Sale in Nigeria | Homz.ng',
        description: 'Browse verified plots of land for sale across Nigeria. Transparent pricing and direct seller contact on Homz.ng.',
      },
    },
    shortlet: {
      withTypeLocation: {
        title: `${pluralType} Shortlets in ${location} | Homz.ng`,
        description: `Book verified ${rawType} shortlets in ${location}, Nigeria. Compare prices and photos on Homz.ng.`,
      },
      withLocation: {
        title: `Shortlet Apartments in ${location} | Homz.ng`,
        description: `Find verified shortlet apartments in ${location}, Nigeria. Book short-term stays with transparent pricing on Homz.ng.`,
      },
      base: {
        title: 'Shortlet Apartments in Nigeria | Homz.ng',
        description: 'Browse verified shortlet apartments across Nigeria. Book short-term stays with transparent pricing on Homz.ng.',
      },
    },
  };

  const pathCopy = copy[basePath] || copy.rent;
  const key = propertyType && location ? 'withTypeLocation' : location ? 'withLocation' : 'base';
  const { title, description } = pathCopy[key];

  const keywords = propertyType && location
    ? [`${rawType} ${basePath} in ${location}`, `${pluralType.toLowerCase()} in ${location}`, `${location} real estate`, 'Homz.ng']
    : location
    ? [`properties in ${location}`, `${location} real estate`, 'Homz.ng']
    : ['real estate Nigeria', 'property listings Nigeria', 'Homz.ng'];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
};