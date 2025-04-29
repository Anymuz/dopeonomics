// src/stores/slices/collapseStateSlice.js
export const createCollapseStateSlice = (set, get) => ({
    collapseState: {},
    getCollapseState: () => get().collapseState,
    setCollapseState: (key, collapsed) => set((state) => ({ collapseState: { ...state.collapseState, [key]: collapsed } })),
});
