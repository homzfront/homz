import { landlordRevenueForAnEstate } from '@/api/landlordService';
import { create } from 'zustand'


const useLandlordRevenueForAnEstate = create((set) => ({
    data: [],
    loading: true,
    fetchData: async (id) => {
        try {
            const response = await landlordRevenueForAnEstate(id);
            // console.log(response)
            const estate = await response;
            set({ data: estate, loading: false });
        } catch (error) {
            set({ loading: false });
            // console.error('Error fetching estate data:', error);
        }
    },
}));

export default useLandlordRevenueForAnEstate;