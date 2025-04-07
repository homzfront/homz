import api from '@/utils/api';
import { create } from 'zustand'


const useTenantOfAnEstate = create((set, get) => ({
    estateData: null,
    data: null,
    loading: true,
    active: 1,
    totalPages: 0,
    currentPage: 1,
    totalCount: 0,
    selectedStatus: null,
    selectedDate: null,
    setEstateData: (data) => set({ estateData: data }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setSelectedStatus: (status) => set({ selectedStatus: status }),
    setSelectedDate: (date) => set({ selectedDate: date }),
    setActive: (date) => set({ active: date }),
    fetchData: async (page = 1, id) => {
        set({ loading: true });
        try {
            const { active, selectedStatus, selectedDate } = get();
            const queryParams = new URLSearchParams({
                limit: 8,
                page,
                ...(active === 2 && { isDueDateRecent: true }),
                ...(selectedStatus && { paymentStatus: selectedStatus.toLowerCase() }),
                ...(selectedDate && { currentRentStartDate: selectedDate }),
            });
            const response = await api.get(`/estates/${id}/tenants/enterprise?${queryParams.toString()}`);
            const result = response?.data;
            set({
                data: result?.data?.length === 0 ? null : result?.data?.results,
                totalPages: result?.data?.totalPages ?? 0,
                loading: false,
                totalCount: result?.data?.totalCount ?? 0
            });
        } catch (error) {
            set({ loading: false });
        }
    },

}));

export default useTenantOfAnEstate;