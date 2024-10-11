import api from '@/utils/api';
import { create } from 'zustand';

const useGeneralPaymentStore = create((set) => ({
  paymentData: null,
  setSelectedDate: (date) => set({ paymentData: date }),

}));

export default useGeneralPaymentStore;
