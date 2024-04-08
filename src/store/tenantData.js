// store.js
import { create } from 'zustand'
import {  tenantEnterprise } from '/src/api/tenantSevice';

const tenantsDataForLoggedInEnterprise = create((set) => ({
  data: null,
  loading: true,
  fetchData: async () => {
    try {
      const response = await tenantEnterprise(); // Assuming tenantMe is your API call function
      const tenants = response?.data;
      set({ data: tenants, loading: false });
    } catch (error) {
      // Handle error if needed, or simply ignore it
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));

export default tenantsDataForLoggedInEnterprise;
