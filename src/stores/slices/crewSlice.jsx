// src/stores/slices/crewSlice.jsx
export const createCrewSlice = (set) => ({
    crew: null,
    setCrew: (newCrew) => set({ crew: newCrew }),
    resetCrew: () => set({ crew: null }),
  });