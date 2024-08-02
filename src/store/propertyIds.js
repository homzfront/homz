import create from 'zustand';

const useStorePropertyIds = create((set) => ({
  propertyIds: [],
  setPropertyIds: (ids) => set({ propertyIds: ids }),
  resetPropertyIds: () => set({ propertyIds: [] }),
}));

export default useStorePropertyIds;
