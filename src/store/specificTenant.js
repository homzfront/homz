import { create } from 'zustand'

const useSpecificTenantStore = create((set) => ({
  tenant: [],
  setTenant: (data) => set({ tenant: data }),
}));

export default useSpecificTenantStore;
