// src/hooks/settingsHook.jsx
import useGameStore from '@stores/GameStore';

const useSettings = () => {
  const activeTab = useGameStore((state) => state.settings.activeTab);
  const setActiveTab = useGameStore((state) => state.setActiveTab);

  const selectedDrugType = useGameStore((state) => state.settings.selectedDrugType);
  const setSelectedDrugType = useGameStore((state) => state.setSelectedDrugType);

  const selectedSeed = useGameStore((state) => state.settings.selectedSeed);
  const setSelectedSeed = useGameStore((state) => state.setSelectedSeed);

  return {
    activeTab,
    setActiveTab,
    selectedDrugType,
    setSelectedDrugType,
    selectedSeed,
    setSelectedSeed,
  };
};

export default useSettings;
