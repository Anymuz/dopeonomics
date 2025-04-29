// src/components/EffectBuilder/EffectBuilderContainer.jsx
import EffectBuilderTab from './EffectBuilderTab';
import { useIngredients } from '@hooks';

const EffectBuilderContainer = () => {
  const { ingredients } = useIngredients();

  // Placeholder for future effect-building logic

  return (
    <EffectBuilderTab ingredients={ingredients} />
  );
};

export default EffectBuilderContainer;