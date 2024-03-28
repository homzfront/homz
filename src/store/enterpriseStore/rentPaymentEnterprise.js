
import { create } from 'zustand';
import { fetchSpecificTenantRentEnterprise } from '@/api/enterpriseManagerService';

const useTenantRentEnterprise = create((set) => ({
    data: [],
    loading: true,
    fetchData: async (id) => {
        try {
            const response = await fetchSpecificTenantRentEnterprise(id);
            // console.log(response)
            const rentPayemnt = await response;
            set({ data: rentPayemnt, loading: false });
        } catch (error) {
            set({ loading: false });
            // console.error('Error fetching rent data:', error);
        }
    },
}));

export default useTenantRentEnterprise;