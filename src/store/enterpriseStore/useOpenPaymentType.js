import { create } from 'zustand'

const useOpenPaymentType = create((set) => ({
    isOpenModal: false,
    isMonthlyData: null,
    isBiAnnaullyData: null,
    isAnnaullyData: null,
    openCardPayment: false,
    openTransferPayment: false,
    error: null,
    openAgain: false,
    setOpenAgain: (data) => set({ openAgain: data }),
    openErrorAgain: false,
    setOpenErrorAgain: (data) => set({ openErrorAgain: data }),
    setError: (data) => set({ error: data }),
    setIsOpenModal: (data) => set({ isOpenModal: data }),
    setIsMonthlyData: (data) => set({ isMonthlyData: data }),
    setIsBiAnnaullyData: (data) => set({ isBiAnnaullyData: data }),
    setIsAnnaullyData: (data) => set({ isAnnaullyData: data }),
    setOpenCardPayment: (data) => set({ openCardPayment: data }),
    setOpenTransferPayment: (data) => set({ openTransferPayment: data }),
}));

export default useOpenPaymentType;




