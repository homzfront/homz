import { create } from 'zustand'

const useReferalReturnPage = create((set) => ({
    referalReturnPage: false,
    setReferalReturnPage: (data) => set({ openErrorAgain: data }),
}));

export default useReferalReturnPage;




