import { create } from 'zustand'

const useTenantRequestStore = create((set) => ({
  request: [],
  setRequest: (data) => set({ rwquest: data }),
}));

export default useTenantRequestStore;
