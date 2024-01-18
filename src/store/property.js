// /src/store/estateStore.js
import { create } from 'zustand'

const usePropertyListedAllStore = create((set) => ({
  propertyListedAll: [],
  setPropertyListedAll: (data) => set({ propertyListedAll: data }),
}));

export default usePropertyListedAllStore;
