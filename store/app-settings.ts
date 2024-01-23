/**
 * paperless
 * app-settings.ts
 * created: 24/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Theme = "light" | "dark" | "automatic";

export interface AppSettingsState {
  theme: Theme;
  updateTheme: (theme: Theme) => void;
}

export const useAppSettingsStore = create<AppSettingsState>()(
  persist(
    (set) => ({
      theme: "automatic",
      updateTheme: (theme) => set(() => ({ theme })),
    }),
    {
      name: "account-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
