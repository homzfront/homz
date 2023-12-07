// useProfileStore.js
import create from "zustand";
import Cookies from "js-cookie";
import api from "@/utils/api";

const useProfileStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  loading: false,

  fetchProfile: async () => {
    try {
      set({ loading: true });
      // Fetch user profile using the token
      const response = await api.get("/user/profile");

      set({
        user: response.data.user || null,
        isLoggedIn: true,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await api.post("http://localhost:5000/api/auth/logout");
      set({ user: null, isLoggedIn: false });
      Cookies.remove("profile");
      Cookies.remove("email")
      // Redirect to login or another appropriate page
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  },

  updateUser: (data) => {
    set((state) => ({ user: { ...state.user, ...data } }));
  },
}));

export default useProfileStore;
