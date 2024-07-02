import { create } from 'zustand'
import { tenantRentInfo, tenantUserWallet, tenantWalletBalance } from '@/api/tenantSevice';

const UseWalletStore = create((set) => ({
    walletPin: false,
    loading: true,
    illuminateWallet: false,
    showKYC: false,
    walletBalance: null,
    rentData: null,
    fetchData: async () => {
        try {
            const response = await tenantUserWallet();
            if (response?.data === null) {
                set({ showKYC: false, walletPin: true, loading: false });
            }
            if (response?.success === true) {
                set({ illuminateWallet: true });
                const rent = await tenantRentInfo();
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

export default UseWalletStore