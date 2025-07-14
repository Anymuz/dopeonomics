// Zustand store for managing mixes in the application
// Allows adding, setting, and resetting mixes, and persists the state across sessions.

// Import necessary libraries from Zustand.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMixesStore = create(
  persist(
    (set) => ({
      mixes: [],
      addMix: (mix) => set((state) => ({ mixes: [...state.mixes, mix] })),
      setMixes: (mixes) => set({ mixes }),
      resetMixes: () => set({ mixes: [] }),
    }),
    {
      name: 'mixes-store', // unique key in localStorage
    }
  )
);
export default useMixesStore;