import { create } from 'zustand'

const useTabForDocuGen = create((set) => ({
  tab: null,
  setTab: (data) => set({ tab: data }),
}));

export default useTabForDocuGen;




