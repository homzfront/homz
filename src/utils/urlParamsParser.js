/**
 * Utility functions for parsing URL parameters and converting them to search filters
 */

/**
 * Maps URL slugs to proper property types
 */
const propertyTypeMapping = {
  'mini-flat': 'mini flat',
  'self-contain': 'self contain',
  'duplex': 'duplex',
  'bungalow': 'bungalow',
  'apartment': 'apartment',
  'house': 'house',
  'office-space': 'office space',
  'shop': 'shop',
  'warehouse': 'warehouse',
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
  
  return propertyTypeMapping[propertyTypeSlug.toLowerCase()] || propertyTypeSlug.replace('-', ' ');
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
  const location = params.location ? parseLocation(params.location) : '';
  const propertyType = params.propertyType ? parsePropertyType(params.propertyType) : '';
  
  let title = '';
  let description = '';

  // Generate title based on parameters
  if (propertyType && location) {
    const actionText = basePath === 'rent' ? 'for Rent' : basePath === 'sales' ? 'for Sale' : basePath;
    title = `${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}s ${actionText} in ${location} - Homz`;
    description = `Find verified ${propertyType}s ${actionText.toLowerCase()} in ${location}. Browse quality properties with transparent pricing on Homz.`;
  } else if (location) {
    const actionText = basePath === 'rent' ? 'for Rent' : basePath === 'sales' ? 'for Sale' : basePath;
    title = `Properties ${actionText} in ${location} - Homz`;
    description = `Discover quality properties ${actionText.toLowerCase()} in ${location}. Browse verified listings with transparent pricing on Homz.`;
  } else {
    const actionText = basePath === 'rent' ? 'for Rent' : basePath === 'sales' ? 'for Sale' : basePath;
    title = `Properties ${actionText} - Homz`;
    description = `Browse verified properties ${actionText.toLowerCase()} across Nigeria. Find your ideal home with transparent pricing on Homz.`;
  }

  return {
    title,
    description,
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