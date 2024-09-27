import { create } from 'zustand';
import { exportEnterpriseRentPayment } from '@/api/enterpriseManagerService';


const useExportRentPayment = create((set) => ({
  data: null,
  loading: true,
  fetchData: async () => {
    try {
      const data = await exportEnterpriseRentPayment();
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

export default useExportRentPayment;