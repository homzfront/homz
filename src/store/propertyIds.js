import create from 'zustand';

const useStorePropertyIds = create((set) => ({
  propertyIds: [],
  setPropertyIds: (ids) => set({ propertyIds: ids }),
}));
 export default useStorePropertyIds;