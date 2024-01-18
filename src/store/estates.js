// /src/store/estateStore.js
import { create } from 'zustand'

const useEstateStore = create((set) => ({
  estates: [],
  setEstates: (data) => set({ estates: data }),
}));

export default useEstateStore;
