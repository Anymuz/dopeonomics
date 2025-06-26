import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useNavStore = create(
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