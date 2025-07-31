import { create } from 'zustand'

const useReferalReturnPage = create((set) => ({
    referalReturnPage: false,
    setReferalReturnPage: (data) => set({ referalReturnPage: data }),
}));

export default useReferalReturnPage;




