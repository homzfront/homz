import { create } from "zustand";
import { fetchEstatesSpecificUSer, getPropertyTenantLandlord } from "@/api/estateService";

const useEstateForOneStore = create((set) => ({
    data: [],
    loading: true,
    fetchData: async (id) => {
        try {
            const response = await fetchEstatesSpecificUSer(id);
            // console.log(response)
            const estate = await response;
            set({ data: estate, loading: false });
        } catch (error) {
            set({ loading: false });
            // console.error('Error fetching estate data:', error);
        }
    },
}));


const usePropertyLandlordTenant = create((set) => ({

    data: [],
    loading: true,
    fetchData: async (id) => {
        try {
            const response = await getPropertyTenantLandlord(id);
            // console.log(response)
            const estate = await response?.results[0]?.data;
            set({ data: estate, loading: false });
        } catch (error) {
            set({ loading: false });
            // console.error('Error fetching estate data:', error);
        }
    },
}))

export { useEstateForOneStore, usePropertyLandlordTenant };