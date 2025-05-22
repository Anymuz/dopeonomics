// src/components/EffectBuilder/EffectBuilderContainer.jsx
import { useState, useMemo } from 'react';
import EffectBuilderTab from './EffectBuilderTab';
import { useIngredients } from '@hooks';

const EffectBuilderContainer = () => {
  const { ingredients } = useIngredients();
  const [selectedIngredientIds, setSelectedIngredientIds] = useState([]);

  const selectedIngredients = ingredients.filter((ing) => selectedIngredientIds.includes(ing.id));

  const combinedEffects = useMemo(() => {
    const effects = new Set();

    selectedIngredients.forEach((ingredient) => {
      const baseEffect = ingredient.defaultEffect;
      let currentEffect = baseEffect;

      selectedIngredients.forEach((other) => {
        if (ingredient === other) return;
        other.interactions?.forEach(({ if: target, replaceWith }) => {
          if (currentEffect === target) currentEffect = replaceWith;
        });
      });

      effects.add(currentEffect);
    });

    return Array.from(effects);
  }, [selectedIngredients]);

  return (
    <EffectBuilderTab
      ingredients={ingredients}
      selectedIngredientIds={selectedIngredientIds}
      setSelectedIngredientIds={setSelectedIngredientIds}
      selectedIngredients={selectedIngredients}
      combinedEffects={combinedEffects}
    />
  );
};

export default EffectBuilderContainer;