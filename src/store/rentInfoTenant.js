import { create } from 'zustand'
import { tenantRentInfo } from '@/api/tenantSevice';

const rentInfoTeant = create((set) => ({
  data: null,
  loading: true,
  fetchData: async () => {
    try {
      const response = await tenantRentInfo(); // Assuming tenantMe is your API call function
      const estate = response?.data;
      set({ data: estate, loading: false });
    } catch (error) {
      // Handle error if needed, or simply ignore it
      // console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));

export default rentInfoTeant;