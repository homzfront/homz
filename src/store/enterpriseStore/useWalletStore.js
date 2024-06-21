import { enterpriseUserWallet } from '@/api/enterpriseManagerService';
import { create } from 'zustand'

const UseWalletStore = create((set) => ({
    data: null,
    loading: true,
    illuminateWallet: false,
    showKYC: false,
    fetchData: async () => {
        try {
            const response = await enterpriseUserWallet();
            if (response?.success === true) {
                set({ illuminateWallet: true });
            }
            const wallet = response;
            set({ data: wallet, loading: false });
        } catch (error) {
            set({ loading: false });
            if (error?.response?.data?.message === 'Please add a valid  National Identity Number or international Passport, before creating / viewing a wallet') {
                set({ showKYC: true });
            }
        }
    },
}));

export default UseWalletStore