import usePropertyStore from '@/store/usePropertyStore';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import {
    getRouteType,
    getBasePath,
    hasManualFilters,
    buildQueryString,
    getListingTypeFromPath
} from '@/utils/routeHelpers';

export const usePropertyActions = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isResetting, setIsResetting] = React.useState(false);
    const [routeFilters, setRouteFilters] = React.useState(null);

    const {
        setFilters,
        setCurrentPage,
        currentPage,
        totalPages,
        fetchProperties,
        filters,
        isFetching,
    } = usePropertyStore();

    // Handle listing type change (navigate to base route)
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

    // Context-aware reset function - Always go to /all page
    const reset = () => {
        setIsResetting(true);

        // Clear all filters including listing type
        const resetFilters = {
            search: '',
            propertyType: null,
            minPrice: null,
            maxPrice: null,
            numberOfBathrooms: null,
            listingType: null, // Clear listing type to show all properties
        };

        // Set the reset filters
        setFilters(resetFilters);
        setCurrentPage(1);

        // Always navigate to /all page on reset
        router.push('/all');

        // Reset flag after navigation
        setTimeout(() => {
            setIsResetting(false);
        }, 100);
    };

    // Pagination helpers
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

    // Detect if user has added manual filters on dynamic routes
    React.useEffect(() => {
        if (isResetting || isFetching) return;

        const routeType = getRouteType(pathname);

        // Only check for manual filters on DYNAMIC routes
        if (routeType === 'DYNAMIC' && routeFilters) {
            const userAddedFilters = hasManualFilters(filters, routeFilters);

            if (userAddedFilters) {
                // User added manual filters - redirect to base route with all filters
                const basePath = getBasePath(pathname);
                const queryString = buildQueryString(filters, currentPage);
                const newUrl = queryString ? `${basePath}?${queryString}` : basePath;

                console.log('[usePropertyAction] Redirecting to BASE route with filters:', newUrl);
                router.push(newUrl);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, currentPage, pathname, isResetting, isFetching]); // Removed routeFilters and router to prevent loops

    // Handle URL params for BASE routes
    const lastUrlRef = React.useRef(null);

    React.useEffect(() => {
        if (isResetting || isFetching) return;

        const routeType = getRouteType(pathname);

        // Only update URL params on BASE routes
        if (routeType === 'BASE') {
            const queryString = buildQueryString(filters, currentPage);
            const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

            // Only push if URL actually changed
            if (typeof window !== 'undefined') {
                const currentUrl = `${pathname}${window.location.search}`;
                
                // Check if we have the fromHome parameter
                const urlParams = new URLSearchParams(window.location.search);
                const hasFromHome = urlParams.has('fromHome');
                
                // If we have fromHome, remove it from the new URL
                if (hasFromHome) {
                    const cleanParams = new URLSearchParams(queryString);
                    cleanParams.delete('fromHome');
                    const cleanQueryString = cleanParams.toString();
                    const cleanUrl = cleanQueryString ? `${pathname}?${cleanQueryString}` : pathname;
                    // console.log('[usePropertyAction] Cleaning fromHome parameter:', cleanUrl);
                    lastUrlRef.current = cleanUrl;
                    router.push(cleanUrl, { scroll: false });
                } else if (newUrl !== currentUrl && lastUrlRef.current !== newUrl) {
                    // console.log('[usePropertyAction] Updating URL:', newUrl);
                    lastUrlRef.current = newUrl;
                    router.push(newUrl, { scroll: false });
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, currentPage, pathname, isResetting, isFetching]); // Removed router to prevent loops

    // Fetch properties with debouncing - Single source of truth for fetching
    // Use a ref to track the last fetch parameters
    const lastFetchRef = React.useRef({ filters: null, page: null });

    React.useEffect(() => {
        if (isResetting || isFetching) return;

        // Create stable strings for comparison
        const filtersString = JSON.stringify(filters);
        const currentPageString = String(currentPage);

        // Only fetch if filters or page actually changed
        if (
            lastFetchRef.current.filters === filtersString &&
            lastFetchRef.current.page === currentPageString
        ) {
            return; // No changes, skip fetch
        }

        // Debounce fetch to prevent rapid consecutive calls
        const timeoutId = setTimeout(() => {
            lastFetchRef.current = {
                filters: filtersString,
                page: currentPageString,
            };
            fetchProperties();
        }, 150); // 150ms debounce

        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, currentPage, isResetting, isFetching]); // fetchProperties intentionally excluded to prevent infinite loop


    return {
        handleListingType,
        reset,
        firstThreePages,
        lastThreePages,
        setRouteFilters, // Export to allow pages to set route-based filters
    };
};