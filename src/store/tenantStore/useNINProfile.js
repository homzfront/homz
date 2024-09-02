import { fetchTenantKYCNINData } from '@/api/tenantSevice';
import { create } from 'zustand'

const useNINProfileStore = create((set) => ({
  data: null,
  loading: true,
  fetchData: async () => {
    try {
      const response = await fetchTenantKYCNINData(); 
      set({ data:  response.data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useNINProfileStore;