/**
 * Route Helper Utilities
 * Handles route type detection and navigation logic for property listings
 */

/**
 * Determines the type of route based on pathname
 * @param {string} pathname - Current pathname (e.g., '/rent', '/rent/lagos')
 * @returns {'BASE' | 'DYNAMIC' | 'OTHER'} - Route type
 */
export const getRouteType = (pathname) => {
  if (!pathname) return 'OTHER';
  
  const segments = pathname.split('/').filter(Boolean);
  
  // Base routes: /rent, /sales, /land, /shortlet, /all
  if (segments.length === 1 && ['rent', 'sales', 'land', 'shortlet', 'all'].includes(segments[0])) {
    return 'BASE';
  }
  
  // Dynamic routes: /rent/lagos, /rent/lagos/mini-flat, etc.
  if (segments.length > 1 && ['rent', 'sales', 'land', 'shortlet'].includes(segments[0])) {
    return 'DYNAMIC';
  }
  
  return 'OTHER';
};

/**
 * Extracts the base path from any property listing route
 * @param {string} pathname - Current pathname
 * @returns {string} - Base path (e.g., '/rent')
 */
export const getBasePath = (pathname) => {
  if (!pathname) return '/all';
  
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length === 0) return '/all';
  
  const baseSegment = segments[0];
  
  // Return base route if valid
  if (['rent', 'sales', 'land', 'shortlet', 'all'].includes(baseSegment)) {
    return `/${baseSegment}`;
  }
  
  return '/all';
};

/**
 * Detects if user has added manual filters beyond route defaults
 * @param {object} currentFilters - Current filter state
 * @param {object} routeFilters - Default filters from route
 * @returns {boolean} - True if user has added manual filters
 */
export const hasManualFilters = (currentFilters, routeFilters) => {
  if (!currentFilters || !routeFilters) return false;
  
  // Properties that indicate manual user interaction
  const manualKeys = ['propertyType', 'minPrice', 'maxPrice', 'numberOfBathrooms'];
  
  // Check if any manual filter has a value different from route default
  const hasManualProperty = manualKeys.some(key => {
    const current = currentFilters[key];
    const route = routeFilters[key];
    
    // Has a value and it's different from route default
    if (current && current !== route) {
      return true;
    }
    
    return false;
  });
  
  if (hasManualProperty) return true;
  
  // Check if search is different from route location
  if (currentFilters.search && routeFilters.search) {
    // Normalize both for comparison (case-insensitive)
    const currentSearch = currentFilters.search.toLowerCase().trim();
    const routeSearch = routeFilters.search.toLowerCase().trim();
    
    if (currentSearch !== routeSearch) {
      return true;
    }
  }
  
  // Check if search was added when route had none
  if (currentFilters.search && !routeFilters.search) {
    return true;
  }
  
  return false;
};

/**
 * Builds query string from filters object (excludes listingType and page)
 * @param {object} filters - Filter object
 * @param {number} currentPage - Current page number
 * @returns {string} - Query string without leading '?'
 */
export const buildQueryString = (filters, currentPage = 1) => {
  const params = new URLSearchParams();
  
  // Add all filters except listingType
  Object.entries(filters).forEach(([key, value]) => {
    if (key !== 'listingType' && value && value !== '' && value !== null && value !== undefined) {
      params.set(key, value);
    }
  });
  
  // Add page if not 1
  if (currentPage > 1) {
    params.set('page', String(currentPage));
  }
  
  return params.toString();
};

/**
 * Gets the listing type from pathname
 * @param {string} pathname - Current pathname
 * @returns {string|null} - Listing type (e.g., 'for rent', 'for sale') or null for '/all'
 */
export const getListingTypeFromPath = (pathname) => {
  if (!pathname) return null;
  
  const mapping = {
    '/rent': 'for rent',
    '/sales': 'for sale',
    '/land': 'land',
    '/shortlet': 'shortlet',
    '/all': null, // /all page doesn't filter by listing type
  };
  
  // Check if pathname starts with any known listing type
  for (const [path, listingType] of Object.entries(mapping)) {
    if (pathname.startsWith(path)) {
      return listingType;
    }
  }
  
  return null;
};
