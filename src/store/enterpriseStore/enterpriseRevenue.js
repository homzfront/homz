// store.js
import { create } from 'zustand'
import { enterpriseRevenue } from '@/api/enterpriseManagerService';

const useEnterpriseRevenueStore = create((set) => ({
  data: null,
  loading: true,
  fetchData: async () => {
    try {
      const response = await enterpriseRevenue(); // Assuming tenantMe is your API call function
      console.log(response);
      const revenue = response.data;
      set({ data: revenue, loading: false });
    } catch (error) {
      // Handle error if needed, or simply ignore it
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));

export default useEnterpriseRevenueStore;