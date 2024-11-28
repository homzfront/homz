import { create } from 'zustand'
import { enterprisePlans } from '@/api/enterpriseManagerService';

const useEnterprisePlans = create((set) => ({
  data: null,
  loading: true,
  fetchData: async () => {
    try {
      const response = await enterprisePlans();
      // console.log(response);
      const stats = response.data;
      set({ data: stats, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useEnterprisePlans;






