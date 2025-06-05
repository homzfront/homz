import HomePage from "@/app/search-page/page";
import { create } from "zustand";

const useTenantForInvite = create((set) => ({
  tenantData: null,
  setTenantData: (data) => set({ tenantData: data }),
}));

export default useTenantForInvite;
