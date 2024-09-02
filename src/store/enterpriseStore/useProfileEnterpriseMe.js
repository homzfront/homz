import { create } from 'zustand';
import { enterpriseMe } from '@/api/enterpriseManagerService';
import PromotionHooks from "@/utils/promoteProperty";


const useProfileEnterpriseMe = create((set) => ({
    data: [],
    loading: true,
    fetchData: async () => {
      try {
      const res = await PromotionHooks.checkCurrentSubscription();
        // console.log(res?.data);
        const response = await enterpriseMe();
        const data = response?.data;
        // console.log(data);
        set({ data: res?.data, loading: false });
      } catch (error) {
        set({ loading: false });
      }
    },
  }));
  
  
export default useProfileEnterpriseMe;