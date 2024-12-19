import { create } from 'zustand'

const useOpenDueDate = create((set) => ({
  tab: null,
  setTab: (data) => set({ tab: data }),
}));

export default useOpenDueDate;