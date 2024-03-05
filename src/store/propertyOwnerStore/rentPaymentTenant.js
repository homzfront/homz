import { fetchSpecificTenantRentPaymentOwner } from '@/api/propertyService';
import { create } from 'zustand'


const useTenantRentPaymentOwner = create((set) => ({
    data: [],
    loading: true,
    fetchData: async (id) => {
        try {
            const response = await fetchSpecificTenantRentPaymentOwner(id);
            console.log(response)
            const estate = await response;
            set({ data: estate, loading: false });
        } catch (error) {
            set({ loading: false });
            console.error('Error fetching estate data:', error);
        }
    },
}));

export default useTenantRentPaymentOwner;