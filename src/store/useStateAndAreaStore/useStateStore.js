import { create } from 'zustand';
import React from 'react'
import { chooseState } from '@/api/selectStateArea';


const useStateStore = create((set) => ({
  loading: false,
  success: false,
  error: null,
  data: null,
  chooseState: async () => {
    set({ loading: true, success: false, error: null, data: null });
    try {
      const response = await chooseState();
      set({ loading: false, success: true, data: response?.data });
    } catch (error) {
      set({ loading: false, success: false, error: error?.response?.data });
    }
  },
}));
export default useStateStore