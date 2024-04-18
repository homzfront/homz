import { create } from 'zustand';
import { propertyMe } from '@/api/propertyService';


const useProfileOwnerMe = create((set) => ({
    data: [],
    loading: true,
    fetchData: async () => {
      try {
        const response = await propertyMe();
        const data = response?.data;
        // console.log(data);
        set({ data: data, loading: false });
      } catch (error) {
        set({ loading: false });
      }
    },
  }));
  
  
export default useProfileOwnerMe;