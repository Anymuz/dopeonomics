// src/components/StrainCreator/StrainCreatorContainer.jsx
import StrainCreatorTab from './StrainCreatorTab';
import { useSeeds, useIngredients } from '@hooks';
import { calculateRecommendedPrice } from '@utils/pricing';

const StrainCreatorContainer = () => {
  const { seeds } = useSeeds();
  const { ingredients } = useIngredients();

  // For now, simulate selected effects and quality
  const selectedEffects = ['Relaxed', 'Happy']; // Replace with real selections later
  const selectedQuality = 'High'; // Replace with real selection later

  const recommendedPrice = calculateRecommendedPrice({
    effects: selectedEffects,
    quality: selectedQuality,
  });

  return (
    <StrainCreatorTab
      seeds={seeds}
      ingredients={ingredients}
      recommendedPrice={recommendedPrice}
    />
  );
};

export default StrainCreatorContainer;