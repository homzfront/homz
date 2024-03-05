import { maintenanceRequestForOwner } from '@/api/maintenanceService';
import { create } from 'zustand';



// Create Zustand store
const useMaintenanceOwnerStore = create((set) => ({
  data: [],
  loading: true,
  fetchData: async () => {
    try {
      const data = await maintenanceRequestForOwner();
      if (data.success) {
        set({ data: data?.data?.results, loading: false });
      } else {
        set({ loading: false }); // Stop loading even if there's an error
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ loading: false }); // Stop loading if there's an error
    }
  },
}));

export default useMaintenanceOwnerStore;