import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

export const useAuth = create((set) => ({

  currentUser: null,
  loading: true,
  isAuthenticated: false,
  error: null,

  // ================= CHECK AUTH =================

  checkAuth: async () => {

    try {

      set({ loading: true });

      const res = await axios.get(
        `${API_URL}/common-api/check-auth`,
        {
          withCredentials: true
        }
      );

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      });

    } catch (err) {

      set({
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error: null
      });
    }
  },

  // ================= LOGIN =================

  login: async (userCredWithRole) => {

    const { role, ...userCred } = userCredWithRole;

    try {

      set({
        loading: true,
        error: null
      });

      const res = await axios.post(
        `${API_URL}/common-api/login`,
        userCred,
        {
          withCredentials: true
        }
      );

      const user = res.data.payload;

      // role validation
      if (
        user.role.toLowerCase() !== role.toLowerCase()
      ) {

        toast.error(
          "Selected role does not match your account"
        );

        set({
          loading: false,
          isAuthenticated: false,
          currentUser: null,
          error: "Selected role does not match your account"
        });

        return { success: false };
      }

      set({
        loading: false,
        isAuthenticated: true,
        currentUser: user,
        error: null
      });

      toast.success("Login successful 🎉");

      return {
        success: true,
        role
      };

    } catch (err) {

      const message =
        err.response?.data?.message ||
        "Login failed";

      toast.error(message);

      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: message
      });

      return { success: false };
    }
  },

  // ================= LOGOUT =================

  logout: async () => {

    try {

      await axios.post(
        `${API_URL}/common-api/logout`,
        {},
        {
          withCredentials: true
        }
      );

      set({
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error: null
      });

      toast.success("Logged out successfully 👋");

      return { success: true };

    } catch (err) {

      toast.error("Logout failed");

      return { success: false };
    }
  }

}));