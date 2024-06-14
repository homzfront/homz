import { maintenanceRequestForATenantEnterprise } from '@/api/maintenanceService';
import { create } from 'zustand'


const useMaintenanceTenantOfAnEstate = create((set) => ({
    data: [],
    loading: true,
    fetchData: async (id) => {
        // console.log(id)
        if (id === undefined) {
            return
        } else {
            try {
                const response = await maintenanceRequestForATenantEnterprise(id);
                // console.log(response)
                const estate = await response.data.results;
                set({ data: estate, loading: false });
            } catch (error) {
                set({ loading: false });
                // console.error('Error fetching estate data:', error);
            }
        }

    },
}));

export default useMaintenanceTenantOfAnEstate;