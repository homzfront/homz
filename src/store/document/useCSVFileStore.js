import { create } from 'zustand'

const useCSVFileStore = create((set) => ({
  CSVFile: null,
  setCSVFile: (data) => set({ CSVFile: data }),
}));

export default useCSVFileStore;




