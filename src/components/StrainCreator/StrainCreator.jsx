// src/components/StrainCreator/StrainCreator.jsx
import SeedSelector from '@components/SharedComponents/SeedSelector/SeedSelector.jsx';
import IngredientComponents from '@components/SharedComponents/IngredientComponents/IngredientComponents.jsx';
import MixDisplayComponents from '@components/SharedComponents/MixDisplayComponents/MixDisplayComponents.jsx';

const StrainCreator = ({
  seeds,
  mixes,
  ingredients,
  selectedSeed,
  selectedIngredients,
  onSeedSelect,
  onIngredientSelect,
}) => {
  return (
    <div className="space-y-6">
      <SeedSelector seeds={seeds} selectedSeed={selectedSeed} onSelect={onSeedSelect} />
      <IngredientComponents ingredients={ingredients} selectedIngredients={selectedIngredients} onSelect={onIngredientSelect} />
      <MixDisplayComponents mixes={mixes} />
    </div>
  );
};

export default StrainCreator;