import { propertyOwnerWallet, propertyOwnerWalletBalance } from '@/api/propertyService';
import { create } from 'zustand'

const UseWalletStore = create((set) => ({
    walletPin: false,
    loading: true,
    illuminateWallet: false,
    showKYC: false,
    walletBalance: null,
    fetchData: async () => {
        try {
            const response = await propertyOwnerWallet();
            if (response?.data === null) {
                set({ showKYC: false, walletPin: true, loading: false });
            }
            if (response?.success === true) {
                set({ illuminateWallet: true });
                const balance = await propertyOwnerWalletBalance()
                set({ walletBalance: balance?.data?.balance?.availableBalance })
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