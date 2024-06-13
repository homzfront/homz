import { fetchOwnerKYCNINData } from '@/api/propertyService';
import { create } from 'zustand'

const useNINProfileStore = create((set) => ({
  data: null,
  loading: true,
  fetchData: async () => {
    try {
      const response = await fetchOwnerKYCNINData(); 
      set({ data:  response.data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useNINProfileStore;