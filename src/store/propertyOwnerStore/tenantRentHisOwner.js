// store.js
import { getRentHisOwner } from '@/api/propertyService';
import { create } from 'zustand'


const tenantRentHisOWner = create((set) => ({
  data: null,
  loading: true,
  fetchData: async () => {
    try {
      const response = await getRentHisOwner(); // Assuming tenantMe is your API call function
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

export default tenantRentHisOWner;