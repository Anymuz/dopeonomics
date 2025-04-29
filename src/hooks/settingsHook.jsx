// src/hooks/settingsHook.jsx
import useGameStore from '@stores/GameStore';

const useSettings = () => {
  const activeTab = useGameStore((state) => state.settings.activeTab);
  const setActiveTab = useGameStore((state) => state.setActiveTab);

  return {
    activeTab,
    setActiveTab,
  };
};

export default useSettings;
