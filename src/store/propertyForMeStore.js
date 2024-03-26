import { create } from 'zustand';
import { propertyForMe } from '@/api/propertyService';


const usePropertyStore = create((set) => ({
    propertyListedAll: [],
    loading: true,
    fetchData: async () => {
      try {
        const data = await propertyForMe();
        // console.log(data);
        const properties = data.data?.results?.[0].data;
        // console.log(properties);
        set({ propertyListedAll: properties, loading: false });
      } catch (error) {
        set({ loading: false });
      }
    },
  }));

  export default usePropertyStore ;