import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserSettingsStore {
  colorMode: "light" | "dark";
  updateColorMode: (mode: "light" | "dark") => void;
}

const useUserSettingsStore = create(
  persist<UserSettingsStore>(
    (set) => ({
      colorMode: "light",
      updateColorMode: (mode: "light" | "dark") => {
        set({ colorMode: mode });
      },
    }),
    {
      name: "userSettings",
    }
  )
);

export default useUserSettingsStore;
