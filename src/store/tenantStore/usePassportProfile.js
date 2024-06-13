import { fetchTenantKYCData } from '@/api/tenantSevice';
import { create } from 'zustand'

const usePassportProfileStore = create((set) => ({
    data: null,
    loading: true,
    fetchData: async () => {
        try {
            const response = await fetchTenantKYCData();
            set({ data: response.data, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },
}));

export default usePassportProfileStore;