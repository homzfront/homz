// store.js
import { tenantWallet, tenantWalletBalance } from '@/api/tenantSevice';
import { create } from 'zustand';

const tenantWalletStore = create((set) => ({
  wallet: null,
  walletBalance: null,
  illuminateWallet: false,
  loading: true,
  fetchData: async () => {
    try {
      set({ loading: true });
      const data = await tenantWallet();
      if (data.statuscode === 200 && data.success === true) {
        const balance = await tenantWalletBalance();
        set({ wallet: data, walletBalance: balance, loading: false, illuminateWallet: true });
      } else {
        // console.error("Fetching wallet data failed", data.message);
        set({ loading: false });
      }
    } catch (error) {
      // console.error("Error fetching wallet data:", error);
      set({ loading: false });
    }
  },
}));

const tenantWalletBalanceStore = create((set) => ({
  walletBalance: null,
  loading: true,
  fetchData: async () => {
    try {
      const balance = await tenantWalletBalance();
      set({ walletBalance: balance, loading: false });
    } catch (error) {
      // console.error("Error fetching wallet balance:", error);
      set({ loading: false });
    }
  },
}));

export { tenantWalletStore, tenantWalletBalanceStore };
