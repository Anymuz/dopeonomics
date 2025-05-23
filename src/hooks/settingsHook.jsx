import useGameStore from '@stores/GameStore';

const useSettings = () => {
  const settings = useGameStore((state) => state.settings);
  const setActiveTab = useGameStore((state) => state.setActiveTab);
  const setSelectedDrugType = useGameStore((state) => state.setSelectedDrugType);
  const setSelectedSeed = useGameStore((state) => state.setSelectedSeed);
  const updateSettings = useGameStore((state) => state.updateSettings);
  const setSettings = useGameStore((state) => state.setSettings);

  return {
    ...settings,
    setActiveTab,
    setSelectedDrugType,
    setSelectedSeed,
    updateSettings,
    setSettings,
  };
};

export default useSettings;
