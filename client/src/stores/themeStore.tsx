import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface State {
  mode: "light" | "dark";
}

interface Action {
  toggleMode: () => void;
}

export const useThemeStore = create<State & Action>()(
  persist(
    (set) => ({
      mode: "light",
      toggleMode: () =>
        set((state) => {
          if (state.mode === "light") {
            return { mode: "dark" };
          } else {
            return { mode: "light" };
          }
        }),
    }),
    {
      name: "pollpal-theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
