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

    const {
        setFilters,
        currentPage,
        totalPages,
        fetchProperties,
        filters,
        reset: resetFilter,
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
        setResetting(true);
        resetFilter();
        // setListingType('for rent');
        setQueryParams({});
        //   router.push('/rent');
    };

    React.useEffect(() => {
        if (resetting && Object.keys(queryParams).length === 0) {
            // setListingType('');
            setQueryParams({});
            // router.push('/rent');
            setResetting(false);
        }
    }, [resetting, queryParams, router]);

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

    // Update queryParams when query changes
    React.useEffect(() => {
        setQueryParams(query);
    }, [query, setQueryParams]);

    React.useEffect(() => {
        const params = new URLSearchParams();

        // Add all queryParams except page and listingType
        Object.entries(queryParams).forEach(([key, value]) => {
            if (key !== "page" && key !== "listingType") {
                params.set(key, value);
            }
        });

        // ✅ Only add page if not 1
        if (currentPage !== 1) {
            params.set("page", String(currentPage));
        }

        // Build URL only if there are params
        const hasParams = params.toString().length > 0;
        if (hasParams) {
            const newUrl = `${pathname}?${params.toString()}`;
            router.push(newUrl, { scroll: false });
        } else {
            // If no params, just use pathname
            router.push(pathname, { scroll: false });
        }

        fetchProperties();
    }, [currentPage, queryParams, fetchProperties, pathname, router]);


    return {
        handleListingType,
        reset,
        firstThreePages,
        lastThreePages,
    };
};