import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const usePropertyListedAllStore = create(
  persist(
    (set) => ({
      propertyListedAll: [],
      marketerId: null,

      setPropertyListedAll: (data) => set({ propertyListedAll: data }),
      setMarketerId: (id) => set({ marketerId: id }),
    }),
    {
      name: "property-store", // storage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ marketerId: state.marketerId }), // ✅ persist only marketerId
    }
  )
);

export default usePropertyListedAllStore;
