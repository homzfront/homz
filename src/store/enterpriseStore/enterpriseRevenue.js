import { create } from 'zustand'
import { enterpriseRevenue } from '@/api/enterpriseManagerService';

const useEnterpriseRevenueStore = create((set) => ({
  data: null,
  loading: true,
  fetchData: async () => {
    try {
      const response = await enterpriseRevenue(); 
      const revenue = response.data;
      set({ data: revenue, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useEnterpriseRevenueStore;