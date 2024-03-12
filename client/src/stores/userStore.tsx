import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  name: string,
  token: string
}

type State = {
  user: User | null
};

type Action = {
  saveUser: (data: User | null) => void
};

export const useUserStore = create<State & Action>()(
  persist(
    (set) => ({
      user: null,
      saveUser: (data: User | null) => set(() => ({user: data}))
    }),
    {
      name: 'pollpal-user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)