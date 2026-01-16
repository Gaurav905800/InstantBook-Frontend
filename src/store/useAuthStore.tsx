import { create } from "zustand";

type User = {
  _id: string;
  username: string;
  phone: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

interface AuthState {
  username: string;
  phone: string;
  email: string;
  password: string;
  role: "user" | "admin";

  user: User | null;
  accessToken: string | null;

  setUsername: (username: string) => void;
  setPhone: (phone: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRole: (role: "user" | "admin") => void;

  setUser: (u: User | null) => void;
  setAccessToken: (t: string | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  username: "",
  phone: "",
  email: "",
  password: "",
  role: "user",

  user: null,
  accessToken: null,

  setUsername: (username) => set({ username }),
  setPhone: (phone) => set({ phone }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setRole: (role) => set({ role }),

  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    set({ user: null, accessToken: null });
  },
}));

export default useAuthStore;
