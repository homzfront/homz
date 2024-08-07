import { create } from 'zustand'

const FormSelection = create((set) => ({
  DocType: null,
  setDocType: (data) => set({ DocType: data }),
}));

export default FormSelection;




