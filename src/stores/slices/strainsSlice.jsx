// src/stores/slices/strainsSlice.jsx
export const createStrainsSlice = (set) => ({
    strains: [],
    setStrains: (newStrains) => set({ strains: newStrains }),
    resetStrains: () => set({ strains: [] }),
  });