import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isLoggedIn: boolean;
  apiKey: string;
  login: (apiKey: string) => void;
  logout: () => void;
}
const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      apiKey: "",
      login: (apiKey: string) => {
        set({ isLoggedIn: true });
        set({ apiKey: apiKey });
      },
      logout: () => {
        set({ isLoggedIn: false });
        localStorage.clear();
      },
    }),
    {
      name: "userLoginStatus",
    }
  )
);

export default useAuthStore;
