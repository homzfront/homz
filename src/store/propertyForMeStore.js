import { create } from 'zustand';
import { propertyForMe } from '@/api/propertyService';

const usePropertyStore = create((set) => ({
  propertyListedAll: [],
  loading: true,
  fetchData: async (page) => {
    set({ loading: true }); // Set loading to true when fetching data
    try {
      const data = await propertyForMe(page);
      // console.log(data)
      const properties = data.data?.results?.[0].data;
      set({ propertyListedAll: data, loading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));

export default usePropertyStore;
