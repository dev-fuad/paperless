/**
 * paperless
 * app-settings.ts
 * created: 24/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import { create } from "zustand";

type Theme = "light" | "dark" | "automatic";

export interface AppSettingsState {
  theme: Theme;
  updateTheme: (theme: Theme) => void;
}

export const useAppSettingsStore = create<AppSettingsState>()((set) => ({
  theme: "automatic",
  updateTheme: (theme) => set(() => ({ theme })),
}));
