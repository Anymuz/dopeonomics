// Custom hook to manage navigation bar state
import useNavStore from '@features/layout/model/nav.store';

// Returns [activeTab, setActiveTab] for convenience
export const useNav = () => {
  const activeTab = useNavStore((state) => state.activeTab);
  const setActiveTab = useNavStore((state) => state.setActiveTab);
  return [activeTab, setActiveTab];
};
export default useNav