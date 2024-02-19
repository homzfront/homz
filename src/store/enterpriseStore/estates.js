import { create } from 'zustand';
import { fetchEstatesMe } from '@/api/estateService';

const estateStore = create((set) => ({
  data: [],
  loading: true,
  fetchData: async () => {
    try {
      const data = await fetchEstatesMe();
      const estate = data.data?.results?.[0].data;
      set({ data: estate, loading: false });
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));

export default estateStore;

