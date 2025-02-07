import { create } from 'zustand'

const useReturnToBulk = create((set) => ({
  returnToBulk: null,
  setReturnToBulk: (data) => set({ returnToBulk: data }),
}));

export default useReturnToBulk ;




