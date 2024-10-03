import { create } from 'zustand';
import { exportEnterpriseTenantRentPayment } from '@/api/enterpriseManagerService';


const useExportEnterpriseSingleTenant = create((set) => ({
  data: null,
  loading: true,
  fetchData: async (id) => {
    try {
      const data = await exportEnterpriseTenantRentPayment(id);
      if (data.success) {
        set({ data: data, loading: false });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      set({ loading: false }); 
    }
  },
}));

export default useExportEnterpriseSingleTenant;