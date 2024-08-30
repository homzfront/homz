import { create } from 'zustand';
import { propertyForMe } from '@/api/propertyService';

const usePropertyStore = create((set) => ({
  propertyListedAll: {},
  loading: true,
  fetchData: async (page, params = {}) => {
    const { is_promoted, is_published, is_unpublished } = params;
    
    set({ loading: true });

    try {
      const data = await propertyForMe(page, is_promoted, is_published, is_unpublished);
      console.log(data)
      const properties = data.data?.results?.[0].data;
      set({ propertyListedAll: data, loading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));

export default usePropertyStore;
