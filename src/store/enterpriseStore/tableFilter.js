import { create } from 'zustand'

const TableFilter = create((set) => ({
  active: false,
  Data: null,
  setActive: (name) => set({ active: name }),
  setData: (name) => set({ Data: name }),
}));

export default TableFilter;




