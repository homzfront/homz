import { setActive } from '@material-tailwind/react/components/Tabs/TabsContext';
import { create } from 'zustand'

const useTenantActiveKYC = create((set) => ({
    step: 0,
    approve: true,
    rejected: false,
    setStep: (data) => set({ step: data }),
}));

export default useTenantActiveKYC;




