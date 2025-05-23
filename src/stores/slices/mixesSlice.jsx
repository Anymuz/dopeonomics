// src/stores/slices/mixesSlice.js
export const createMixesSlice = (set) => ({
  mixes: [],
  addMix: (mix) => set((state) => ({ mixes: [...state.mixes, mix] })),
  resetMixes: () => set(() => ({ mixes: [] })),
});
