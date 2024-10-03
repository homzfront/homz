import { create } from 'zustand'

const PaymentRefetchTenant = create((set) => ({
    Refetch: false,
    setRefetch: (data) => set({ Refetch: data }),
}));

export default PaymentRefetchTenant;