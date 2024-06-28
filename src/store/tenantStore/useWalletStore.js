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
                const balance = await tenantWalletBalance();
                set({ walletBalance: balance?.data?.balance?.availableBalance })
                const rent = await tenantRentInfo();
                set({ rentData: rent })
            }
        } catch (error) {
            set({ loading: false });
            if (error?.response?.data?.message === 'Please add a valid  National Identity Number or international Passport, before creating / viewing a wallet') {
                set({ showKYC: true });
            }
            else set({
                showKYC: false
            })
        }
    },
}));

export default UseWalletStore