// State management for navigation tabs using Zustand with persistence
// This store manages the active tab in the navigation bar and persists it across sessions.

// Import necessary libraries from Zustand.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useNavStore = create(
  persist(
    (set) => ({
      activeTab: 'creator', // default tab
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: 'nav-store', // unique key in localStorage
    }
  )  
);
export default useNavStore;