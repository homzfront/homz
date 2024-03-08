import React from 'react'
import { create } from 'zustand';
import { chooseArea } from '@/api/selectStateArea';


const useAreaStore = create((set) => ({
    loading: false,
    success: false,
    error: null,
    data: null,
    chooseArea: async (state) => {
        set({ loading: true, success: false, error: null, data: null });
        try {
            const response = await chooseArea(state);
            set({ loading: false, success: true, data: response?.data });
        } catch (error) {
            set({ loading: false, success: false, error: error?.response?.data });
        }
    },
}));
export default useAreaStore