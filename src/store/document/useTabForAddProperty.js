import { create } from 'zustand'

const useTabForAddProperty = create((set) => ({
  tab: null,
  setTab: (data) => set({ tab: data }),
}));

export default useTabForAddProperty;




