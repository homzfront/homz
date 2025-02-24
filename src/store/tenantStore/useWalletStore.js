import { create } from 'zustand'
import { getRentHis, tenantRentInfo, tenantUserWallet, tenantWalletActivities, tenantWalletBalance } from '@/api/tenantSevice';

const UseWalletStore = create((set) => ({
    walletPin: false,
    loading: false,
    illuminateWallet: false,
    showKYC: false,
    walletBalance: null,
    rentData: null,
    rentHisLoading: false,
    rentHis: null,
    rentHisWallet: null,
    rentHisOffline: null,
    walletActivities: null,
    fetchData: async () => {
        try {
            set({ loading: true, rentHisLoading: true });
            const response = await tenantUserWallet();
            if (response?.data === null) {
                set({ showKYC: false, walletPin: true, loading: false });
            }
            if (response?.success === true) {
                const activies = await tenantWalletActivities();
                set({ walletActivities: activies?.data })
                set({ illuminateWallet: true });
                const rent = await tenantRentInfo();
                const response = await getRentHis();
                const rentHis = response?.upDateddata?.results;
                set({ rentHis: rentHis, rentHisLoading: false });
                set({ rentData: rent });
                const timeoutId = setTimeout(async () => {
                    const balance = await tenantWalletBalance();
                    set({ walletBalance: balance?.data?.balance?.availableBalance });
                }, 3000);
                return () => clearTimeout(timeoutId);
            }
        } catch (error) {
            set({ loading: false, rentHisLoading: false });
            if (error?.response?.data?.status === 400) {
                set({ showKYC: true });
            }
            else set({
                showKYC: false
            })
        }
    },
    fetchRentData: async (paymentMethod = null) => {
        try {
            set({ rentHisLoading: true });
            const response = await getRentHis(paymentMethod);
            const rentHis = response?.upDateddata?.results;
            if (paymentMethod === "wallet") {
                set({ rentHisWallet: rentHis, rentHisLoading: false });
            } else  {
                set({ rentHisOffline: rentHis, rentHisLoading: false });
            }
        } catch (error) {
            set({ rentHisLoading: false });
        }
    }
}));

export default UseWalletStore;