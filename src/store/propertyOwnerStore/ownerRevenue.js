// store.js
import { create } from 'zustand'
import { propertyOwnerRevenue } from '@/api/propertyService';

const usePropertyOwnerRevenueStore = create((set) => ({
  data: null,
  loading: true,
  fetchData: async () => {
    try {
      const response = await propertyOwnerRevenue(); // Assuming tenantMe is your API call function
      // console.log(response);
      const revenue = response.data;
      set({ data: revenue, loading: false });
    } catch (error) {
      // Handle error if needed, or simply ignore it
      // console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));

export default usePropertyOwnerRevenueStore;