import { propertyOwnerWallet, propertyOwnerWalletActivities, propertyOwnerWalletBalance } from '@/api/propertyService';
import { create } from 'zustand'

const UseWalletStore = create((set) => ({
    walletPin: false,
    loading: true,
    illuminateWallet: false,
    showKYC: false,
    walletBalance: null,
    walletActivities: null,
    fetchData: async () => {
        try {
            const response = await propertyOwnerWallet();
            if (response?.data === null) {
                set({ showKYC: false, walletPin: true, loading: false });
            }
            if (response?.success === true) {
                const activies = await propertyOwnerWalletActivities();
                set ({ walletActivities: activies?.data})
                set({ illuminateWallet: true });
                const timeoutId = setTimeout(async () => {
                    const balance = await propertyOwnerWalletBalance();
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