import { create } from 'zustand'

const RefetchPayment = create((set) => ({
    Refetch: false,
    setRefetch: (data) => set({ Refetch: data }),
}));

export default RefetchPayment;




