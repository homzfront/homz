import { fetchCategory } from '@/api/enterpriseManagerService';
import { create } from 'zustand'

const useExpenseStore = create((set) => ({
    categories: null,
    loadingCate: true,
    selectedOption: null,
    fetchCategory: async () => {
        try {
            const response = await fetchCategory();
            set({ categories: response.data, loadingCate: false });
        } catch (error) {
            set({ loadingCate: false });
        }
    },
    selectedCate: null,
    setSelectedCate: (data) => set({ selectedCate: data }),
    selectedStatus: null,
    search: '',
    pageNo: 1,
    setPageNo: (data) => set({ pageNo: data }),
    allData: null,
    setAllData: (data) => set({ allData: data }),
    setSearch: (data) => set({ search: data }),
    setSelectedOption: (date) => set({ selectedOption: date }),
    fromDate: null,  // Set default fromDate in the store
    toDate: null,
    setSelectedStatus: (data) => set({ selectedStatus: data }),
    setFromDate: (date) => set({ fromDate: date }),  // Add setter for fromDate
    setToDate: (date) => set({ toDate: date }),
}));

export default useExpenseStore;