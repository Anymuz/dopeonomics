// src/stores/slices/seedsSlice.jsx
export const createSeedsSlice = (set) => ({
    seeds: [],
  
    setSeeds: (newSeeds) => set({ seeds: newSeeds }),
  
    resetSeeds: () => set({ seeds: [] }),
  });
