import { create } from 'zustand'

const useCSVFileStore = create((set) => ({
  CSVFile: null,
  mappedData: null,
  estateId: null,
  withoutNameAEmail: null,
  withoutRentInfo: null,
  setEstateId: (data) => set({ estateId: data }),
  setCSVFile: (data) => set({ CSVFile: data }),
  setMappedData: (data) => set({ mappedData: data }),
  setWithoutNameAEmail: (data) => set({ withoutNameAEmail: data }),
  setWithoutRentInfo: (data) => set({withoutRentInfo: data }),
}));

export default useCSVFileStore;




