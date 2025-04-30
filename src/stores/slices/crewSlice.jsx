// src/stores/slices/crewSlice.jsx
export const createCrewSlice = (set) => ({
    crew: [],
    setCrew: (newCrew) => set({ crew: newCrew }),
    resetCrew: () => set({ crew: [] }),
  });