import { create } from 'zustand'

const useCSVFileStore = create((set) => ({
  CSVFile: null,
  response: null,
  mappedData: null,
  estateId: null,
  withoutNameAEmail: null,
  openMapping: null,
  withoutRentInformation: null,
  setEstateId: (data) => set({ estateId: data }),
  setCSVFile: (data) => set({ CSVFile: data }),
  setMappedData: (data) => set({ mappedData: data }),
  setWithoutNameAEmail: (data) => set({ withoutNameAEmail: data }),
  setWithoutRentInfo: (data) => set({ withoutRentInformation: data }),
  setResponse: (data) => set({ response: data }),
  setOpenMapping:(data) => set({openMapping: data})
}));

export default useCSVFileStore;




