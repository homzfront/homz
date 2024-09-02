import { create } from "zustand";
import { fetchEstateRentReminders } from "@/api/estateService";

const useEstateRentRemindersStore = create((set) => ({
    data: [],
    error: null,
    loading: true,
    fetchData: async (id) => {
        try {
            const response = await fetchEstateRentReminders(id);
            set({ data: response.data, loading: false });
        } catch (error) {
            set({ loading: false, error: error });
        }
    },
}));

export default useEstateRentRemindersStore;
