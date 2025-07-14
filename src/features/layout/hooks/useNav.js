// Hook for managing navigation state in the application
// Provides functionality to get and set the active navigation tab using Zustand for persistent state management.

// Import the Zustand store for navigation state.
import useNavStore from '@features/layout/model/nav.store';

// Returns [activeTab, setActiveTab] for convenience
const useNav = () => {
  const activeTab = useNavStore((state) => state.activeTab);
  const setActiveTab = useNavStore((state) => state.setActiveTab);
  return {activeTab, setActiveTab};
};
export default useNav