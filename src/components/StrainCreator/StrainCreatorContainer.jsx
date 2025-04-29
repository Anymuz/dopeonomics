// src/components/StrainCreator/StrainCreatorContainer.jsx
import { useState } from 'react';
import StrainCreator from './StrainCreator';
import { useSeeds, useMixes, useIngredients } from '@hooks';

const StrainCreatorContainer = () => {
  const { seeds } = useSeeds();
  const { mixes } = useMixes();
  const { ingredients } = useIngredients();

  const [selectedSeed, setSelectedSeed] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleSeedSelect = (seed) => {
    setSelectedSeed(seed);
  };

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredients((prev) => [...prev, ingredient]);
  };

  return (
    <StrainCreator
      seeds={seeds}
      mixes={mixes}
      ingredients={ingredients}
      selectedSeed={selectedSeed}
      selectedIngredients={selectedIngredients}
      onSeedSelect={handleSeedSelect}
      onIngredientSelect={handleIngredientSelect}
    />
  );
};

export default StrainCreatorContainer;