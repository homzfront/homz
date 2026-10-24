import { create } from 'zustand'
import { getInspectionsByTenant, getInspectionsByEstate } from '@/api/inspectionService';

// Holds the inspections for one property, plus a convenience getter for the currently
// scheduled one. Two ways in:
//  - fetchByEstate(estateId): the property page's Routine Inspection tab (manage them)
//  - fetchData(tenantId): the tenant profile's read-only tab (shows the tenant's property)
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
  fetchByEstate: async (estateId) => {
    if (!estateId) return;
    set({ loading: true });
    try {
      const response = await getInspectionsByEstate(estateId);
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