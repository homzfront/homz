import usePropertyStore from '@/store/usePropertyStore';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';

export const usePropertyActions = ({ isSlug = false } = {}) => {
    const router = useRouter();
    const urlParams = useSearchParams();
    const pathname = usePathname();
    const [listingType, setListingType] = React.useState('');
    const [queryParams, setQueryParams] = React.useState({});
    const [resetting, setResetting] = React.useState(false);

    const {
        setFilters,
        currentPage,
        totalPages,
        fetchProperties,
        filters,
        reset: resetFilter,
        handleFilterChange,
    } = usePropertyStore();

    const handleListingType = (query) => {
        if (query === 'for rent') {
            router.push('/properties/listing/rent');
        } else if (query === 'for sale') {
            router.push('/properties/listing/sales');
        } else if (query === 'land') {
            router.push('/properties/listing/land');
        } else {
            router.push('/properties/listing/shortlet');
        }
    };

    const reset = () => {
        setResetting(true);
        resetFilter();
        setListingType('');
        setQueryParams({});
    };

    React.useEffect(() => {
        if (resetting && Object.keys(queryParams).length === 0) {
            setListingType('');
            setQueryParams({});
            router.push('/properties/listing/?page=1');
            setResetting(false);
        }
    }, [resetting, queryParams, router]);

    React.useEffect(() => {
        let listing = '';
        const pathSegments = pathname.split('/').filter(Boolean);
        if (pathname.includes('/rent')) listing = 'for rent';
        if (pathname.includes('/sales')) listing = 'for sale';
        if (pathname.includes('/land')) listing = 'land';
        if (pathname.includes('/shortlet')) listing = 'shortlet';
        setListingType(listing);
        if (pathSegments[3] || pathSegments[4]) {

            handleFilterChange("search", pathSegments[3]);

            // Set propertyType filter from 5th segment if it exists
            if (pathSegments[4]) {
                handleFilterChange("propertyType", pathSegments[4]);
            }
        }
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

    // Update queryParams when query changes
    React.useEffect(() => {
        setQueryParams(query);
    }, [query, setQueryParams]);

    // This effect handles both fetching properties and URL updates
    React.useEffect(() => {
        const fetchDataAndUpdateUrl = async () => {
            await fetchProperties();

            // Only update URL after successful fetch if no slug present
            if (!isSlug) {
                const params = new URLSearchParams();

                if (Object.keys(queryParams).length > 0) {
                    params.set('page', currentPage);
                }

                Object.entries(queryParams).forEach(([key, value]) => {
                    if (key !== 'page') {
                        params.set(key, value);
                    }
                });

                if (Object.keys(queryParams).length > 0 || currentPage !== 1) {
                    const newUrl = `${pathname}?${params.toString()}`;
                    router.push(newUrl, { scroll: false });
                }

                setShouldUpdateUrl(false);
            }
        };

        fetchDataAndUpdateUrl();
    }, [currentPage, queryParams, fetchProperties, pathname, router]);

    return {
        handleListingType,
        reset,
        firstThreePages,
        lastThreePages,
    };
};