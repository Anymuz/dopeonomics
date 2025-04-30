// src/components/StrainCreator/StrainCreatorContainer.jsx
import { useState, useMemo } from 'react';
import StrainCreatorTab from './StrainCreatorTab';
import { useSeeds, useIngredients, useStrains } from '@hooks';
import { calculateRecommendedPrice } from '@/utils/pricing';

const StrainCreatorContainer = () => {
  const { seeds } = useSeeds();
  const { ingredients } = useIngredients();
  const { strains, setStrains } = useStrains();

  const [selectedSeed, setSelectedSeed] = useState(null);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState([]);
  const [strainName, setStrainName] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('Medium');

  const selectedIngredients = ingredients.filter(ing => selectedIngredientIds.includes(ing.id));

  const effects = useMemo(() => selectedIngredients.flatMap(
    (ingredient) => ingredient.defaultEffect ? [ingredient.defaultEffect] : []
  ), [selectedIngredients]);

  const recommendedPrice = useMemo(() =>
    calculateRecommendedPrice({ effects, quality: selectedQuality }),
    [effects, selectedQuality]
  );

  const syntheticStrain = {
    id: strains.length + 1,
    name: strainName,
    seed: selectedSeed,
    ingredients: selectedIngredients,
    effects,
    quality: selectedQuality,
    price: recommendedPrice,
  };

  const saveStrain = () => {
    if (!strainName || selectedIngredients.length === 0) return;
    setStrains([...strains, syntheticStrain]);
    setStrainName('');
    setSelectedSeed(null);
    setSelectedIngredientIds([]);
    setSelectedQuality('Medium');
  };

  return (
    <StrainCreatorTab
      seeds={seeds}
      ingredients={ingredients}
      selectedSeed={selectedSeed}
      setSelectedSeed={setSelectedSeed}
      selectedIngredientIds={selectedIngredientIds}
      setSelectedIngredientIds={setSelectedIngredientIds}
      strainName={strainName}
      setStrainName={setStrainName}
      selectedQuality={selectedQuality}
      setSelectedQuality={setSelectedQuality}
      syntheticStrain={syntheticStrain}
      onSave={saveStrain}
    />
  );
};

export default StrainCreatorContainer;
