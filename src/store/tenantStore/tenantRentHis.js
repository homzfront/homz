// store.js
import { getRentHis } from '@/api/tenantSevice';
import { create } from 'zustand'


const tenantRentHis = create((set) => ({
  data: null,
  loading: true,
  fetchData: async () => {
    try {
      const response = await getRentHis(); // Assuming tenantMe is your API call function
      // console.log(response);
      const rentHis = response?.upDateddata?.results;
      set({ data: rentHis, loading: false });
    } catch (error) {
      // Handle error if needed, or simply ignore it
      // console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));

export default tenantRentHis;

