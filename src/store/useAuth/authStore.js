import { create } from 'zustand';
import api from '@/utils/api';

const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUserProfile: async () => {
    try {
      const response = await api.get('user/profile');
      const userData = response.data.user || null;
      set({ user: userData });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      set({ user: null });
    }
  },
}));

export default useAuthStore;

