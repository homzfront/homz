import create from "zustand";

const useHeaderStore = create((set) => ({
  popUpMenuTwo: false,
  headerOpenedOnce: false,
  setPopUpMenuTwo: (value) =>
    set((state) => ({ popUpMenuTwo: value })),
  setHeaderOpenedOnce: (value) =>
    set((state) => ({ headerOpenedOnce: value })),
}));

export default useHeaderStore;
