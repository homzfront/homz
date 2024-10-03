import { create } from 'zustand'

const usePaymentFilterStore = create((set) => ({
    selectedProperty: null,
    selectedDate: null,
    setSelectedDate: (data) => set({ selectedDate: data }),
    setSelectedProperty: (data) => set({ selectedProperty: data }),
}));

export default usePaymentFilterStore;