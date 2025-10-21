// stores/propertyStore.ts
import api from '@/utils/api';
import { create } from 'zustand';

export const useFeatureStore = create((set, get) => ({
  featuredData: null,
  lastFetchedAt: null,
  fetchFeaturedData: async () => {
    const state = get();
    const now = Date.now();
    if (state.lastFetchedAt && (now - state.lastFetchedAt) < 120000) {
      return;
    }
    try {
      const response = await api.get('/public/properties/featured');
      set({ featuredData: response?.data?.data || null, lastFetchedAt: now });
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      set({ featuredData: null });
    }
  },
  clearFeaturedData: () => set({ featuredData: null, lastFetchedAt: null }),
}));