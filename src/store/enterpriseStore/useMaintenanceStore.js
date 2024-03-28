import { create } from "zustand";
import { maintenanceRequestForAnEnterprise } from "@/api/maintenanceService";
import { fetchSpecificTenant } from "@/api/tenantSevice";

// Create Zustand store
const useMaintenanceRequestStore = create((set) => ({
  request: null,
  tenantData: [],
  loading: true,
  fetchData: async () => {
    try {
      const data = await maintenanceRequestForAnEnterprise();
      const request = data?.data;
      set({ request });
      // console.log(request);

      const tenantPromises = await request?.results.map((tenant) =>
        fetchSpecificTenant(tenant.tenant._id)
      );

      const tenantData = await Promise.all(tenantPromises);
      // console.log(tenantData);
      set({ tenantData, loading: false });
    } catch (error) {
      // console.log(error);
      set({ loading: false });
    }
  },
}));


export default useMaintenanceRequestStore ;
