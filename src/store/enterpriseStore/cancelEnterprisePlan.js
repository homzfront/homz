// store.js
import { create } from 'zustand'
import { cancelEnterprisePlanSub } from '@/api/tenantSevice';

const cancelEnterprisePlan = create((set) => ({
    data: null,
    loading: true,
    error: null,
    fetchData: async (emailToken, subscriptionCode) => {
        try {
            const response = await cancelEnterprisePlanSub(emailToken, subscriptionCode);
            set({ data: response, loading: false });
        } catch (error) {
            set({ loading: false, error: error });
        }
    },
}));

export default cancelEnterprisePlan;
