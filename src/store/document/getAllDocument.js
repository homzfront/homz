import { create } from 'zustand';
import { getAllDocu } from '@/api/enterpriseManagerService';

const useGetAllDocument = create((set, get) => ({
    // State variables
    data: null,
    loading: true,
    page: 1,
    FormName: '',
    DocType: '',
    limit: 5,
    search: '',
    totalPages: 1,
    currentPage: 1,
    totalCounts: null,

    // Fetch data from the API with current parameters
    fetchData: async () => {
        const { page, FormName, DocType, limit, search } = get();
        set({ loading: true });
        try {
            const data = await getAllDocu({ page, FormName, DocType, limit, search });
            set({
                data: data?.data?.results,
                loading: false,
                totalPages: data?.data?.totalPages,
                currentPage: data?.data?.currentPage,
                totalCounts: data?.data?.totalCount
            });
        } catch (error) {
            set({ loading: false });
            console.error("Failed to fetch documents:", error);
        }
    },

    // Set page and fetch data
    setPage: (newPage) => {
        set({ page: newPage });
        get().fetchData();  // Fetch data when page changes
    },

    // Methods to set specific parameters
    setFormNameParams: (formName) => {
        set({ FormName: formName, page: 1 });
        get().fetchData();  // Fetch data when FormName changes
    },
    setDocTypeParams: (docType) => {
        set({ DocType: docType, page: 1 });
        get().fetchData();  // Fetch data when DocType changes
    },
    setSearchParams: (searchTerm) => {
        set({ search: searchTerm, page: 1 });
        get().fetchData();  // Fetch data when search term changes
    },

    // reset search
    resetSearch: () => set({ search: '', page: 1 }),
}));

export default useGetAllDocument;
