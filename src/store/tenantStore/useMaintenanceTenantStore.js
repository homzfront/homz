import { create } from 'zustand';
import { maintenanceByASpecificTenant } from "@/api/maintenanceService";


// Create Zustand store
const useMaintenanceTenantStore = create((set) => ({
  data: [],
  loading: true,
  fetchData: async () => {
    try {
      const data = await maintenanceByASpecificTenant();
      if (data.success) {
        set({ data: data?.data?.results, loading: false });
      } else {
        set({ loading: false }); // Stop loading even if there's an error
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
      set({ loading: false }); // Stop loading if there's an error
    }
  },
}));

export default useMaintenanceTenantStore;
