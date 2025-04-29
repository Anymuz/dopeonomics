// src/stores/slices/mixesSlice.jsx
export const createMixesSlice = (set) => ({
    mixes: [],
  
    setMixes: (newMixes) => set({ mixes: newMixes }),
  
    resetMixes: () => set({ mixes: [] }),
  });
