import { create } from 'zustand';
import { fetchOwnerTenantRentSummary } from '@/api/enterpriseManagerService';

const useRentSummaryTenant = create((set) => ({
    data: [],
    loading: true,
    fetchData: async (id, startDate, dueDate, rent) => {
        try {
            const response = await fetchOwnerTenantRentSummary(id, startDate, dueDate, rent);
            // console.log(response)
            const rentPayemnt = await response;
            set({ data: rentPayemnt, loading: false });
        } catch (error) {
            set({ loading: false });
            // console.error('Error fetching rent data:', error);
        }
    },
}));

export default useRentSummaryTenant;