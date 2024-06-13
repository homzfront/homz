import { fetchKYCData } from '@/api/enterpriseManagerService';
import { create } from 'zustand'

const usePassportProfileStore = create((set) => ({
    data: null,
    loading: true,
    fetchData: async () => {
        try {
            const response = await fetchKYCData();
            set({ data: response.data, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },
}));

export default usePassportProfileStore;