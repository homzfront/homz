import { create } from 'zustand';
import { enterpriseMe } from '@/api/enterpriseManagerService';


const useProfileEnterpriseMe = create((set) => ({
    data: [],
    loading: true,
    fetchData: async () => {
      try {
        const response = await enterpriseMe();
        const data = response?.data;
        console.log(data);
        set({ data: data, loading: false });
      } catch (error) {
        set({ loading: false });
      }
    },
  }));
  
  
export default useProfileEnterpriseMe;