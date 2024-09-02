import { create } from 'zustand'

const FormSelection = create((set) => ({
  DocType: null,
  FormName: "",
  setDocType: (data) => set({ DocType: data }),
  setFormName: (name) => set({ FormName: name }),
}));

export default FormSelection;




