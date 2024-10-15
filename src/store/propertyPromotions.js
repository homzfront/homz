import { create } from 'zustand';
import PromotionHooks from "@/utils/promoteProperty";


const useStorePropertyPromotion = create((set) => ({
  propertyIds: [],
  singleId: "",
  propertyPlanType: "",
  errorModal: false,
  subsciptionStatus: null,

  getSubscription: async () => {
    try {
      const response = await PromotionHooks.checkCurrentSubscription();
      set({ subscriptionStatus: response });
    } catch (error) {
      console.error("Error fetching subscription status:", error);
    }
  },
  setSinglePropertyId: (id) => set({ singleId: id }),
  setPropertyPlanType: (type) => set({ propertyPlanType: type }),
  setPropertyIds: (ids) => set({ propertyIds: ids }),
  resetPropertyIds: () => set({ propertyIds: [] }),
  setErrorModal: (status) => set({ errorModal: status }),
}));

export default useStorePropertyPromotion;
