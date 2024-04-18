// storeFinanceData.js
import { create } from 'zustand';

const useStoreData = create((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
}));

export default useStoreData;
