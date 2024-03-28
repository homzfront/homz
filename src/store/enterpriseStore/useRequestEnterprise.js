import { create } from 'zustand';
import { fetchTenantRequest } from '@/api/estateService';
import { fetchOneTenant } from '@/api/tenantSevice';

const useRequestEnterprise = create((set) => ({
    request: null,
    tenantData: [],
    loading: true,
    fetchData: async () => {
      try {
        const data = await fetchTenantRequest();
        // console.log(data);
        const tenantRequests = data.data?.tenantRequest || []; // Ensure tenantRequest is an array
        // console.log(tenantRequests);
        
        // Filter out pending requests
        const pendingRequests = tenantRequests.filter(tenant => tenant.status === "pending");
        // console.log(pendingRequests);
        
        // Fetch specific tenant data for pending requests
        const tenantPromises = pendingRequests.map(tenant => fetchOneTenant(tenant.tenant));
        const tenantData = await Promise.all(tenantPromises);
        // console.log(tenantData);
        
        set({ request: pendingRequests, tenantData, loading: false });
      } catch (error) {
        // console.error("Error:", error);
        set({ loading: false });
      }
    },
  }));

  export default useRequestEnterprise;