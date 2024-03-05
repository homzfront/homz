import { enterpriseTenantForAnEstate } from '@/api/enterpriseManagerService';
import { create } from 'zustand'


const useTenantOfAnEstate = create((set) => ({
    data: [],
    loading: true,
    fetchData: async (id) => {
        try {
            const response = await enterpriseTenantForAnEstate(id);
            console.log(response)
            const estate = await response;
            set({ data: estate, loading: false });
        } catch (error) {
            set({ loading: false });
            console.error('Error fetching estate data:', error);
        }
    },
}));

export default useTenantOfAnEstate;