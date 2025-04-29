// src/components/SharedComponents/SeedSelector/SeedSelectorContainer.jsx
import SeedSelector from './SeedSelector';

const SeedSelectorContainer = ({ seeds, selectedSeed, onSelect }) => {
  return (
    <SeedSelector
      seeds={seeds}
      selectedSeed={selectedSeed}
      onSelect={onSelect}
    />
  );
};

export default SeedSelectorContainer;