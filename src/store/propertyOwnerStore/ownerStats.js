// store.js
import { create } from 'zustand'
import { propertyOwnerStatistics } from '@/api/propertyService';

const usePropertyOwnerStatsStore = create((set) => ({
  data: null,
  loading: true,
  fetchData: async () => {
    try {
      const response = await propertyOwnerStatistics(); // Assuming tenantMe is your API call function
      console.log(response);
      const stats = response.data;
      set({ data: stats, loading: false });
    } catch (error) {
      // Handle error if needed, or simply ignore it
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));

export default usePropertyOwnerStatsStore;






