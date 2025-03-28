import api from '@/utils/api';
import { create } from 'zustand';


const useWalletPaymentStore = create((set) => ({
    data: [],
    loading: true,
    totalPages: 0,
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),
    fetchData: async (TenantId, page = 1, startDate, dueDate) => {
        set({ loading: true });
        try {
            const response = await api.get(`/rentPayment/enterprise/tenant/${TenantId}?limit=3&page=${page}&paymentMethod=wallet&startDate=${startDate}&dueDate=${dueDate}`);
            const result = response?.data;
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

export default useWalletPaymentStore;
