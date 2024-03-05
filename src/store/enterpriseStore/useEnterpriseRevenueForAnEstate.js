import { enterpriseRevenueForAnEstate } from '@/api/enterpriseManagerService';
import { create } from 'zustand'


const useEnterpriseRevenueForAnEstate = create((set) => ({
    data: [],
    loading: true,
    fetchData: async (id) => {
        try {
            const response = await enterpriseRevenueForAnEstate(id);
            console.log(response)
            const estate = await response;
            set({ data: estate, loading: false });
        } catch (error) {
            set({ loading: false });
            console.error('Error fetching estate data:', error);
        }
    },
}));

export default useEnterpriseRevenueForAnEstate;