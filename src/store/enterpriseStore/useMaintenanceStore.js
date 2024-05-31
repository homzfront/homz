import { create } from "zustand";
import { maintenanceRequestForAnEnterprise } from "@/api/maintenanceService";

// Create Zustand store
const useMaintenanceRequestStore = create((set) => ({
  request: null,
  loading: true,
  fetchData: async () => {
    try {
      const data = await maintenanceRequestForAnEnterprise();
      const request = data?.data;
      set({ request,  loading: false });
    } catch (error) {
      // console.log(error);
      set({ loading: false });
    }
  },
}));


export default useMaintenanceRequestStore ;
