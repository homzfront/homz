import { create } from 'zustand'

const StoreData = create((set) => ({
    data: [],
    setData: (newData) => set({ data: newData }),
  }));



export default StoreData;