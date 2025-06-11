import HomePage from "@/app/search-page/page";
import { create } from "zustand";

const useTabForDocuGen = create((set) => ({
  tab: null,
  homePage: false,
  setTab: (data) => set({ tab: data }),
  setHomePage: (data) => set({ homePage: data }),
}));

export default useTabForDocuGen;
