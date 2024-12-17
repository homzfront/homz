import api from '@/utils/api';
import { create } from 'zustand';


const useEnterpriseTenantStore = create((set, get) => ({
    data: [],
    loading: true,
    totalPages: 0,
    currentPage: 1,
    dueDatePage: false,
    totalCount: 0,
    setDueDatePage: (value) => set({ dueDatePage: value }),
    setCurrentPage: (page) => set({ currentPage: page }),
    fetchData: async (page = 1, dueDate) => {
        console.log("HHI")
        set({ loading: true });
        console.log(dueDate)
        console.log(page)
        try {
            const { dueDatePage } = get();

            console.log(dueDatePage)
            const queryParams = new URLSearchParams({
                limit: 8,
                page,
                ...(dueDatePage && dueDate && { dueDate }),
            });

            const response = await api.get(`/tenants/enterprise?${queryParams.toString()}`);
            const result = response?.data;

            set({
                data: result?.data?.results,
                totalPages: result?.data?.totalPages,
                loading: false,
                totalCount: result?.data?.totalCount
            });
        } catch (error) {
            set({ loading: false });
        }
    },

}));

export default useEnterpriseTenantStore;
