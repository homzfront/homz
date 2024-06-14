import { create } from 'zustand';
import api from '@/utils/api';

const useProfileStore = create((set) => ({
  profile: null,
  isLoggedIn: false,
  loading: false,


  fetchProfile: async () => {
    try {
      set({ loading: true });
      const response = await api.get('/user/profile');
      const userData = response.data.user || null;
      set({ profile: userData, isLoggedIn: true, loading: false });
      if (typeof window !== 'undefined') {
        localStorage.setItem('profile', JSON.stringify(userData));
      }
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        useProfileStore.getState().logout();
      }, 3600000);
    } catch (error) {
      // console.error('Error fetching profile:', error);
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      set({ profile: null, isLoggedIn: false, loading: false });
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }
      window.location.href = '/';
    } catch (error) {
      // console.error('Error logging out:', error);
    }
  },

  updateUser: (data) => {
    set((state) => ({ user: { ...state.user, ...data } }));
  },
}));

// Check if user data exists in localStorage upon initialization (only in the browser environment)
if (typeof window !== 'undefined') {
  const storedUserData = localStorage.getItem('profile');
  if (storedUserData) {
    const parsedUserData = JSON.parse(storedUserData);
    useProfileStore.setState({ profile: parsedUserData, isLoggedIn: true });
  }
}

export default useProfileStore;
