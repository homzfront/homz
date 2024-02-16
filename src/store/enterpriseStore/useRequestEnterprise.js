import { create } from 'zustand';
import { fetchTenantRequest } from '@/api/estateService';
import { fetchSpecificTenant } from '@/api/tenantSevice';

const useRequestEnterprise = create((set) => ({
    request: null,
    tenantData: [],
    loading: true,
    fetchData: async () => {
      try {
        const data = await fetchTenantRequest();
        console.log(data);
        const request = data.data?.tenantRequest;
        console.log(request);
        const tenantPromises = await request?.map((tenant) =>
          fetchSpecificTenant(tenant.tenant)
        );
        const tenantData = await Promise.all(tenantPromises);
        console.log(tenantData);
        set({ request, tenantData, loading: false });
      } catch (error) {
        set({ loading: false });
      }
    },
  }));

  export default useRequestEnterprise;