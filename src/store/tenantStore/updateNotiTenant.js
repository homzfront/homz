// store.js
import { updateTenantNoti } from '@/api/notification';
import { create } from 'zustand'


const updateNotiTenant = create((set) => ({
  data: null,
  loading: true,
  fetchData: async () => {
    try {
      const response = await updateTenantNoti(); // Assuming tenantMe is your API call function
      const tenants = response?.notifications;
      set({ data: tenants, loading: false });
    } catch (error) {
      // Handle error if needed, or simply ignore it
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));

export default updateNotiTenant;

