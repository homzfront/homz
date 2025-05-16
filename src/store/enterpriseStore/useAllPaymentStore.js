import api from '@/utils/api';
import { create } from 'zustand';


const useAllPaymentStore = create((set) => ({
    data: [],
    loading: true,
    totalPages: 0,
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),
    fetchData: async (TenantId, page = 1, startDate, dueDate) => {
        set({ loading: true });
        try {
            const response = await api.get(`/rentPayment/enterprise/tenant/${TenantId}?limit=3&page=${page}&startDate=${startDate}&dueDate=${dueDate}`);
            const result = response?.data;
            console.log(response)
            set({
                data: result?.data?.results,
                totalPages: result?.data?.totalPages,
                loading: false,
            });
        } catch (error) {
            set({ loading: false });
        }
    },
}));

export default useAllPaymentStore;
