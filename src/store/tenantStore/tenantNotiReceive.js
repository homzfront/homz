// store.js
import { tenantNotificationReceive } from '@/api/notification';
import { create } from 'zustand'


const tenantNotiReceive = create((set) => ({
  data: null,
  loading: true,
  fetchData: async () => {
    try {
      const response = await tenantNotificationReceive(); // Assuming tenantMe is your API call function
      const tenants = response?.notifications;
      set({ data: tenants, loading: false });
    } catch (error) {
      // Handle error if needed, or simply ignore it
      // console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));

export default tenantNotiReceive;