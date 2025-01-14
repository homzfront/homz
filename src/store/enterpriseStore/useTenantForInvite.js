import HomePage from '@/app/user_homepage/page';
import { create } from 'zustand'

const useTenantForInvite = create((set) => ({
    tenantData: null,
    setTenantData: ((data) => set({ tenantData: data }))
}));

export default useTenantForInvite;

