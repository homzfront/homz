import { fetchKYCNINData } from '@/api/enterpriseManagerService';
import { create } from 'zustand'

const useNINProfileStore = create((set) => ({
  data: null,
  loading: true,
  fetchData: async () => {
    try {
      const response = await fetchKYCNINData(); 
      set({ data:  response.data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useNINProfileStore;