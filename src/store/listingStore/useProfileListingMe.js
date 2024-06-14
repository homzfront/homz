import { create } from 'zustand';
import { listingMe } from '@/api/listingServices';


const useProfileListingMe = create((set) => ({
    data: [],
    loading: true,
    fetchData: async () => {
      try {
        const response = await listingMe();
        const data = response?.data;
        // console.log(data);
        set({ data: data, loading: false });
      } catch (error) {
        set({ loading: false });
      }
    },
  }));
  
  
export default useProfileListingMe;