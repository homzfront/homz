import { create } from 'zustand';
import { enterpriseRentPayemntInfo } from '@/api/enterpriseManagerService';


const useRentPaymentStore = create((set) => ({
  data: [],
  loading: true,
  fetchData: async () => {
    try {
      const data = await enterpriseRentPayemntInfo();
      if (data.success) {
        set({ data: data?.data?.results, loading: false });
      } else {
        set({ loading: false }); // Stop loading even if there's an error
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
      set({ loading: false }); // Stop loading if there's an error
    }
  },
}));

export default useRentPaymentStore;