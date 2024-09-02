import { create } from 'zustand'
import { getRentHis, tenantRentInfo, tenantUserWallet, tenantWalletActivities, tenantWalletBalance } from '@/api/tenantSevice';

const UseWalletStore = create((set) => ({
    walletPin: false,
    loading: true,
    illuminateWallet: false,
    showKYC: false,
    walletBalance: null,
    rentData: null,
    rentHis: null,
    walletActivities: null,
    fetchData: async () => {
        try {
            const response = await tenantUserWallet();
            if (response?.data === null) {
                set({ showKYC: false, walletPin: true, loading: false });
            }
            if (response?.success === true) {
                const activies = await tenantWalletActivities();
                set ({ walletActivities: activies?.data})
                set({ illuminateWallet: true });
                const rent = await tenantRentInfo();
                const response = await getRentHis(); 
                const rentHis = response?.upDateddata?.results;
                set({ rentHis: rentHis })
                set({ rentData: rent })
                const timeoutId = setTimeout(async () => {
                    const balance = await tenantWalletBalance();
                    set({ walletBalance: balance?.data?.balance?.availableBalance });
                }, 3000);
                return () => clearTimeout(timeoutId);
            }
        } catch (error) {
            set({ loading: false });
            if (error?.response?.data?.status === 400) {
                set({ showKYC: true });
            }
            else set({
                showKYC: false
            })
        }
    },
}));

export default UseWalletStore;