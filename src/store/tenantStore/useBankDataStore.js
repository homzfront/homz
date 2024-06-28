import { bankInfoTenant } from '@/api/tenantSevice';
import { create } from 'zustand'

const UseBankDataStore = create((set) => ({
    bankdata: null,
    loading: true,
    fetchData: async () => {
        try {
            const response = await  bankInfoTenant();
            if (response.success === true) {
                set({ loading: false, bankdata: response?.data });
            }
        } catch (error) {
            set({ loading: false });
        }
    },
}));

export default UseBankDataStore;