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
  selectedOption: null,
  setSelectedOption: (date) => set({ selectedOption: date }),
  fromDate: formatDateII(prevMonth),  // Set default fromDate in the store
  toDate: formatDateII(today),       // Set default toDate in the store
  setSelectedProperty: (data) => set({ selectedProperty: data }),
  setFromDate: (date) => set({ fromDate: date }),  // Add setter for fromDate
  setToDate: (date) => set({ toDate: date }),      // Add setter for toDate
}));

export default usePaymentFilterStore;