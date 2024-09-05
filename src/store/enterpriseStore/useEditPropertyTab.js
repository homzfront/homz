import { create } from 'zustand'

const useEditPropertyTab = create((set) => ({
  tab: null,
  setTab: (data) => set({ tab: data }),
}));

export default useEditPropertyTab;




