import HomePage from "@/app/(properties)/page";
import { create } from "zustand";

const useTenantForInvite = create((set) => ({
  tenantData: null,
  setTenantData: (data) => set({ tenantData: data }),
}));

export default useTenantForInvite;
