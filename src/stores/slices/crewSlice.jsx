// src/stores/slices/crewSlice.js





export const createCrewSlice = (set, get) => ({
    crewMembers: { botanist: 0, cleaner: 0, handler: 0, chemist: 0 },
    getCrewMembers: () => get().crewMembers,
    setCrewMembers: (crew) => set({ crewMembers: crew }),
    updateCrewMember: (role, count) => set((state) => ({ crewMembers: { ...state.crewMembers, [role]: count } })),
    resetCrewMembers: () => set({ crewMembers: { botanist: 0, cleaner: 0, handler: 0, chemist: 0 } }),
});
