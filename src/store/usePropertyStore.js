import { create } from 'zustand';
import api from '@/utils/api';

const usePropertyStore = create((set, get) => ({
    // State
    currentPage: 1,
    mobileModalIsOpen: false,
    totalPages: 0,
    totalData: 0,
    loading: false,
    property: null,
    loadingII: true,
    properties: null,
    otherProperties: null,
    filters: {
        search: '',
        propertyType: null,
        minPrice: null,
        maxPrice: null,
        numberOfBathrooms: null,
        listingType: null,
    },

    // Actions
    setFilters: (newFilters) => set({ filters: newFilters }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setMobileModalIsOpen: (open) => set({ mobileModalIsOpen: open }),
    setTotalPages: (total) => set({ totalPages: total }),
    setTotalData: (total) => set({ totalData: total }),
    setLoadingII: (loadingII) => set({ loadingII }),

    // Reset function
    reset: async () => {
        await set({
            currentPage: 1,
            filters: {
                search: '',
                propertyType: null,
                minPrice: null,
                maxPrice: null,
                numberOfBathrooms: null,
                listingType: '',
            },
        });
    },

    
    fetchOtherProperties: async () => {
        set({ loading: true });
        try {
            const response = await api.get('/public/properties?limit=3');
            const data = response.data;
            if (data?.data && data?.message !== 'No items found') {
                const otherPropertyData = data?.data?.results[0]?.data || null;
                set({ otherProperties: otherPropertyData, loading: false });
            } else {
                set({ otherProperties: null, loading: false });
            }
        } catch (error) {
            console.error('Error fetching other properties:', error);
            set({ otherProperties: null, loading: false });
        }
    },
    
    // Functions
    fetchProperties: async () => {
        const { filters, currentPage } = get();
        set({ loading: true });

        const query = {};
        Object.keys(filters).forEach((key) => {
            if (filters[key]) {
                query[key] = filters[key];
            }
        });

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const page = urlParams.get("page") || currentPage;

            const response = await api.get(
                `/public/properties?page=${page}&${new URLSearchParams(query).toString()}`
            );

            const data = response.data;
            if (data?.data && data?.message !== "No items found") {
                const propertyData = data?.data?.results[0]?.data || null;
                const total = data.data.results[0]?.metadata[0]?.total || 0;

                set({
                    property: propertyData,
                    loading: false,
                    loadingII: false,
                    totalPages: Math.ceil(total / 9),
                    totalData: total,
                });
            } else {
                set({
                    property: null,
                    totalPages: 0,
                    loading: false,
                    loadingII: false,
                });
            }
        } catch (error) {
            console.error("Error fetching properties:", error);
            set({
                property: null,
                totalPages: 0,
                loading: false,
                loadingII: false,
            });
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    },

    handleFilterChange: (key, value) => {
        const { filters } = get();
        const newFilters = { ...filters, [key]: value };
        set({ filters: newFilters, paramss: true });
    },

    handleSearchChange: (e) => {
        const { value } = e.target;
        get().handleFilterChange("search", value);
    },

    handleSearch: (query, label) => {
        get().handleFilterChange(label, query);
    },

    handleNextPage: () => {
        const { currentPage, totalPages } = get();
        if (currentPage < totalPages) {
            set({ currentPage: currentPage + 1, paramss: true });
        }
    },

    handlePrevPage: () => {
        const { currentPage } = get();
        if (currentPage > 1) {
            set({ currentPage: currentPage - 1, paramss: true });
        }
    },

    handlePageClick: (page) => {
        set({ currentPage: page, paramss: true });
    },

    openMobileModal: () => {
        set({ mobileModalIsOpen: true });
    },

    closeMobileModal: () => {
        set({ mobileModalIsOpen: false });
    },
}));

export default usePropertyStore;