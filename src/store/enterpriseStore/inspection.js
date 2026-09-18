import { create } from 'zustand'
import { getInspectionsByTenant } from '@/api/inspectionService';

// Holds the inspection history for one tenant, plus a convenience getter for the
// currently scheduled one — the panel needs that for the badge/date-time display (spec §3.5).
const useInspectionTenant = create((set, get) => ({
  data: [],
  loading: true,
  fetchData: async (tenantId) => {
    if (!tenantId) return;
    set({ loading: true });
    try {
      const response = await getInspectionsByTenant(tenantId);
      set({ data: response?.data || [], loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
  getScheduledInspection: () => {
    const { data } = get();
    return (data || []).find((inspection) => inspection.status === 'scheduled') || null;
  },
}));

export default useInspectionTenant;