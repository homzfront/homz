import { create } from 'zustand';

// Helper function to format date (assuming formatDateII exists)
const formatDateII = (date) => {
  // Your date formatting logic here
  return date.toISOString().split('T')[0]; // Example format: YYYY-MM-DD
};

// Calculate default dates
const today = new Date();
const prevMonth = new Date();
prevMonth.setMonth(today.getMonth() - 1);

const usePaymentFilterStore = create((set) => ({
  selectedProperty: null,
  isLoading: false,
  setIsLoading:(data) => set({ isLoading: data }),
  selectedOption: null,
  search: '',
  activeState: 'one',
  pageNo: 1,
  setPageNo: (data) => set({ pageNo: data }),
  setActiveState: (data) => set({ activeState: data }),
  allData: null,
  setAllData: (data) => set({ allData: data }),
  offlineData: null,
  setOfflineData: (data) => set({ offlineData: data }),
  walletData: null,
  setWalletData: (data) => set({ walletData: data }),
  setSearch: (data) => set({ search: data }),
  setSelectedOption: (date) => set({ selectedOption: date }),
  fromDate: formatDateII(prevMonth),  // Set default fromDate in the store
  toDate: formatDateII(today),       // Set default toDate in the store
  setSelectedProperty: (data) => set({ selectedProperty: data }),
  setFromDate: (date) => set({ fromDate: date }),  // Add setter for fromDate
  setToDate: (date) => set({ toDate: date }),      // Add setter for toDate
  fee: null,
  setFee: (data) => set({ fee: data }),
}));

export default usePaymentFilterStore;