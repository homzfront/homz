import { create } from 'zustand'

const useOpenPaymentType = create((set) => ({
    isOpenModal: false,
    isMonthlyData: null,
    isBiAnnaullyData: null,
    isAnnaullyData: null,
    openCardPayment: false,
    openTransferPayment: false,
    setIsOpenModal: (data) => set({ isOpenModal: data }),
    setIsMonthlyData: (data) => set({ isMonthlyData: data }),
    setIsBiAnnaullyData: (data) => set({ isBiAnnaullyData: data }),
    setIsAnnaullyData: (data) => set({ isAnnaullyData: data }),
    setOpenCardPayment: (data) => set({ openCardPayment: data }),
    setOpenTransferPayment: (data) => set({ openTransferPayment: data }),
}));

export default useOpenPaymentType;




