// stores/propertyStore.ts
import api from '@/utils/api';
import { create } from 'zustand';

export const useFeatureStore = create((set) => ({
  featuredData: null,
  fetchFeaturedData: async () => {
    try {
      const response = await api.get('/public/properties/featured');
      set({ featuredData: response?.data?.data || null });
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      set({ featuredData: null });
    }
  },
}));