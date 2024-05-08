import { create } from 'zustand';
import { publicProp } from '@/api/propertyService';


const publicProperty = create((set) => ({
    property: [],
    loading: true,
    fetchData: async () => {
        try {
            const data = await publicProp();
            console.log(data);
            const properties = data.data?.results?.[0].data || data?.data;
            // console.log(properties);
            set({ property: properties, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },
}));

export default publicProperty;