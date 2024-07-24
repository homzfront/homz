import { create } from 'zustand';
import { enterpriseMe } from '@/api/enterpriseManagerService';
import { useRouter } from 'next/router';

const useProfileEnterpriseMeTwo = create((set) => ({
  data: null,
  loading: true,
  shouldFetch: false,
  fetchData: async () => {
    try {
      const response = await enterpriseMe();
      const data = response?.data;
      set({ data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
  triggerFetch: () => set({ shouldFetch: true }),
}));

export default useProfileEnterpriseMeTwo;
