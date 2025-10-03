import usePropertyStore from '@/store/usePropertyStore';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';

export const usePropertyActions = () => {
    const router = useRouter();
    const urlParams = useSearchParams();
    const pathname = usePathname();
    const [listingType, setListingType] = React.useState('');
    const [queryParams, setQueryParams] = React.useState({});
    const [resetting, setResetting] = React.useState(false);
    const [isResetting, setIsResetting] = React.useState(false);

    const {
        setFilters,
        currentPage,
        totalPages,
        fetchProperties,
        filters,
        reset: resetFilter,
        isFooterRoute,
        setIsFooterRoute,
        setShowBanner,
    } = usePropertyStore();

    const handleListingType = (query) => {
        if (query === 'for rent') {
            router.push('/rent');
        } else if (query === 'for sale') {
            router.push('/sales');
        } else if (query === 'land') {
            router.push('/land');
        } else {
            router.push('/shortlet');
        }
    };

    const reset = () => {
        // Set resetting flag to prevent useEffects
        setIsResetting(true);
        
        // Clear everything immediately
        resetFilter();
        setQueryParams({});
        setIsFooterRoute(false); // Clear footer route flag
        
        // Use setTimeout to ensure state is cleared before navigation
        setTimeout(() => {
            // Redirect to base listing page based on current path
            if (pathname.includes('/rent')) {
                router.push('/rent');
            } else if (pathname.includes('/sales')) {
                router.push('/sales');
            } else if (pathname.includes('/land')) {
                router.push('/land');
            } else if (pathname.includes('/shortlet')) {
                router.push('/shortlet');
            }
            setIsResetting(false);
        }, 10);
    };



    React.useEffect(() => {
        let listing = '';
        if (pathname.includes('/rent')) listing = 'for rent';
        if (pathname.includes('/sales')) listing = 'for sale';
        if (pathname.includes('/land')) listing = 'land';
        if (pathname.includes('/shortlet')) listing = 'shortlet';
        setListingType(listing);
    }, [pathname]);

    const updatedFilters = React.useMemo(() => {
        if (!listingType) return filters;
        return { ...filters, listingType };
    }, [listingType, filters]);

    React.useEffect(() => {
        if (
            listingType &&
            JSON.stringify(updatedFilters) !== JSON.stringify(filters)
        ) {
            setFilters(updatedFilters);
        }
    }, [updatedFilters, filters, setFilters, listingType]);

    const { firstThreePages, lastThreePages } = React.useMemo(() => {
        const firstThree = Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1);
        const lastThree = Array.from(
            { length: Math.max(0, totalPages - 1) },
            (_, i) => totalPages - i
        )
            .filter((page) => page > 1 && page < totalPages)
            .reverse();

        return { firstThreePages: firstThree, lastThreePages: lastThree };
    }, [totalPages]);

    // Memoized query computation
    const query = React.useMemo(() => {
        const result = {};
        Object.keys(filters).forEach((key) => {
            if (filters[key] !== null && filters[key] !== '') {
                result[key] = filters[key];
            }
        });
        return result;
    }, [filters]);

    // Update queryParams when query changes (skip if resetting)
    React.useEffect(() => {
        if (!isResetting) {
            setQueryParams(query);
        }
    }, [query, setQueryParams, isResetting]);

    React.useEffect(() => {
        // Skip everything if we're in the middle of resetting
        if (isResetting) {
            return;
        }

        // Analyze current route structure
        const pathSegments = pathname.split('/').filter(segment => segment !== '');
        const isBaseRoute = pathSegments.length === 1 && ['rent', 'sales', 'land', 'shortlet'].includes(pathSegments[0]); // e.g., /rent, /sales (base listing pages)
        const isDynamicRoute = pathSegments.length > 1; // e.g., /rent/lagos, /rent/lagos/mini-flat
        
        // Check if we have URL parameters (indicates came from homepage search or manual filters)
        const currentUrlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
        const hasExistingUrlParams = currentUrlParams.toString().length > 0;
        
        // Determine route type and URL parameter strategy
        let shouldUpdateUrl = false;
        let routeType = 'unknown';
        
        if (isBaseRoute) {
            // Base routes (/rent, /sales, /land, /shortlet) - ALWAYS show URL params
            // These are where homepage searches land
            routeType = 'base';
            shouldUpdateUrl = true;
            setIsFooterRoute(false); // Never a footer route
            setShowBanner(false); // Hide banner for homepage searches
        } else if (isDynamicRoute) {
            // Dynamic routes (/rent/lagos, /rent/lagos/mini-flat) - Footer routes
            routeType = 'dynamic';
            
            if (hasExistingUrlParams) {
                // If we already have URL params, preserve them (came from homepage or user added filters)
                shouldUpdateUrl = true;
                setIsFooterRoute(false); // Act like normal route with params
                setShowBanner(false); // Hide banner when params exist
            } else {
                // No URL params - check if user has added manual filters
                const hasManualFilters = Object.keys(queryParams).some(key => {
                    const value = queryParams[key];
                    if (!value || value === '' || value === null || value === undefined) return false;
                    
                    // These are always considered manual user interactions
                    if (['propertyType', 'minPrice', 'maxPrice', 'numberOfBathrooms'].includes(key)) {
                        return true;
                    }
                    
                    // Search that's different from the URL location is manual
                    if (key === 'search') {
                        const urlLocation = pathSegments[1]; // e.g., 'lagos' from /rent/lagos
                        const expectedSearch = urlLocation ? urlLocation.charAt(0).toUpperCase() + urlLocation.slice(1) : '';
                        return value !== expectedSearch;
                    }
                    
                    return false;
                });
                
                if (hasManualFilters) {
                    // User added filters - show URL params and hide banner
                    shouldUpdateUrl = true;
                    setIsFooterRoute(false);
                    setShowBanner(false);
                } else {
                    // Clean footer route - no URL params, banner can be shown
                    shouldUpdateUrl = false;
                    setIsFooterRoute(true);
                }
            }
        } else {
            // Other routes - default behavior
            routeType = 'other';
            shouldUpdateUrl = true;
            setIsFooterRoute(false);
            setShowBanner(false); // Hide banner for other routes
        }

        // Update URL if allowed
        if (shouldUpdateUrl) {
            const params = new URLSearchParams();

            // Add all queryParams except page and listingType
            Object.entries(queryParams).forEach(([key, value]) => {
                if (key !== "page" && key !== "listingType" && value !== null && value !== '' && value !== undefined) {
                    params.set(key, value);
                }
            });

            // Add page if not 1
            if (currentPage !== 1) {
                params.set("page", String(currentPage));
            }

            // Build final URL
            const hasParams = params.toString().length > 0;
            const newUrl = hasParams ? `${pathname}?${params.toString()}` : pathname;
            
            // Only push if URL actually changed
            const currentUrl = `${pathname}${window.location.search}`;
            if (newUrl !== currentUrl) {
                router.push(newUrl, { scroll: false });
            }
        } else {
            // Clean footer route - ensure no params in URL
            const currentUrl = `${pathname}${window.location.search}`;
            if (currentUrl !== pathname) {
                router.push(pathname, { scroll: false });
            }
        }

        // Always fetch properties (unless resetting)
        fetchProperties();
    }, [currentPage, queryParams, fetchProperties, pathname, router, isResetting, setIsFooterRoute]);


    return {
        handleListingType,
        reset,
        firstThreePages,
        lastThreePages,
    };
};