import { bankInfoPropertyOwner } from '@/api/propertyService';
import { create } from 'zustand'

const UseBankDataStore = create((set) => ({
    bankdata: null,
    loading: true,
    noBank: false,
    fetchData: async () => {
        try {
            const response = await  bankInfoPropertyOwner();
            if (response.success === true) {
                set({ loading: false, bankdata: response?.data });
            }   else if (response?.message === "bank not found") {
                set({ loading: false, noBank: true });
            } 
        } catch (error) {
            set({ loading: false });
        }
    },
}));

export default UseBankDataStore;