import { fetchSpecificTenantRentPaymentOwner } from '@/api/propertyService';
import { create } from 'zustand'


const useTenantRentPaymentOwner = create((set) => ({
    data: [],
    loading: true,
    fetchData: async (id) => {
        try {
            const response = await fetchSpecificTenantRentPaymentOwner(id);
            console.log(response)
            const rentPayemnt = await response;
            set({ data: rentPayemnt, loading: false });
        } catch (error) {
            set({ loading: false });
            console.error('Error fetching rent data:', error);
        }
    },
}));

export default useTenantRentPaymentOwner;