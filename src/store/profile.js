import { create } from 'zustand';
import api from '@/utils/api';

let logoutTimer; // Declare logoutTimer globally for session tracking

const useProfileStore = create((set) => ({
  profile: null,
  isLoggedIn: false,
  loading: false,

  // Fetch user profile
  fetchProfile: async () => {
    try {
      set({ loading: true });
      
      // Fetch profile data from API
      const response = await api.get('/user/profile');
      const userData = response.data.user || null;
      
      // Set profile data in Zustand store
      set({ profile: userData, isLoggedIn: true, loading: false });

      if (typeof window !== 'undefined') {
        // Store profile data and set logout expiration in localStorage
        localStorage.setItem('profile', JSON.stringify(userData));
        
        const logoutTime = Date.now() + 86400000; // Set session expiration for 24 hours
        localStorage.setItem('logoutTime', logoutTime);

        // Clear any previous logout timers and set a new one for 24 hours
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(() => {
          useProfileStore.getState().logout(); // Trigger logout after 24 hours
        }, 86400000); // 24 hours in milliseconds
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      set({ loading: false });
    }
  },

  // Logout logic
  logout: async () => {
    try {
      await api.post('/auth/logout');
      set({ profile: null, isLoggedIn: false, loading: false });
      
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }
      
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },

  // Update user state
  updateUser: (data) => {
    set((state) => ({ user: { ...state.user, ...data } }));
  },
}));

// Initialization: Check session validity on load
if (typeof window !== 'undefined') {
  const storedUserData = localStorage.getItem('profile');
  const storedLogoutTime = localStorage.getItem('logoutTime');

  if (storedLogoutTime && Date.now() > parseInt(storedLogoutTime)) {
    // Session expired, trigger logout
    useProfileStore.getState().logout();
  } else if (storedUserData) {
    // Session still valid, set user profile
    const parsedUserData = JSON.parse(storedUserData);
    useProfileStore.setState({ profile: parsedUserData, isLoggedIn: true });

    // Adjust timer to the remaining session time
    const remainingTime = parseInt(storedLogoutTime) - Date.now();
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      useProfileStore.getState().logout();
    }, remainingTime);
  }

  // Periodically check for session expiration (optional)
  setInterval(() => {
    const storedLogoutTime = localStorage.getItem('logoutTime');
    if (storedLogoutTime && Date.now() > parseInt(storedLogoutTime)) {
      useProfileStore.getState().logout();
    }
  }, 60000); // Check every 1 minute
}

export default useProfileStore;
