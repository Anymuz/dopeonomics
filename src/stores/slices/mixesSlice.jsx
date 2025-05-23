// src/stores/slices/createMixesSlice.js

export const createMixesSlice = (set, get) => ({
  mixes: [],

  addMix: (mix) => {
    set((state) => ({
      mixes: [...state.mixes, mix],
    }));
  },

  removeMix: (mixId) => {
    set((state) => ({
      mixes: state.mixes.filter((mix) => mix.id !== mixId),
    }));
  },

  clearMixes: () => {
    set(() => ({
      mixes: [],
    }));
  },

  getMixes: () => get().mixes,
});
