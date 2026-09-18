import { create } from 'zustand'
import { getRentReviewsByTenant } from '@/api/rentReviewService';

// Holds the rent review history for one tenant, plus a convenience getter for
// whatever review is currently active (status: scheduled | held_for_balance) —
// that's the one the "Review Rent" panel needs to render as a badge (spec §2.5).
const useRentReviewTenant = create((set, get) => ({
  data: [],
  loading: true,
  fetchData: async (tenantId) => {
    if (!tenantId) return;
    set({ loading: true });
    try {
      const response = await getRentReviewsByTenant(tenantId);
      set({ data: response?.data || [], loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
  getActiveReview: () => {
    const { data } = get();
    return (data || []).find(
      (review) => review.status === 'scheduled' || review.status === 'held_for_balance'
    ) || null;
  },
}));

export default useRentReviewTenant;