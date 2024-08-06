import create from 'zustand';

const useStorePropertyIds = create((set) => ({
  propertyIds: [],
  singleId:"",
  propertyPlanType:"",
  setSinglePropertyId: (id) => set({ singleId: id }),
  setPropertyPlanType: (type) => set({ propertyPlanType: type }),
  setPropertyIds: (ids) => set({ propertyIds: ids }),
  resetPropertyIds: () => set({ propertyIds: [] }),
}));

export default useStorePropertyIds;
