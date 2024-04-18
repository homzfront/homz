
import { create } from 'zustand';
import { enterpriseMePropertyOwnerUnderEstate } from '@/api/enterpriseManagerService';

const landlordsUnderEnterprise = create((set) => ({
  data: [],
  loading: true,
  fetchData: async () => {
    try {
      const data = await enterpriseMePropertyOwnerUnderEstate();
    //   console.log(data);
      const estate = data.data?.roles;
      set({ data: estate, loading: false });
    } catch (error) {
      // Handle error if needed
      // console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));

export default landlordsUnderEnterprise;

