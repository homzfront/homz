// stores/useViewportStore.ts
import { create } from 'zustand';

const useViewportStore = create((set) => ({
  width: 0,
  isAt624px: false,
  setViewport: (width) =>
    set({
      width,
      isAt1024px: width >= 624,
    }),
}));

export default useViewportStore;
