// src/components/SharedComponents/IngredientComponents/IngredientComponentsContainer.jsx
import IngredientComponents from './IngredientComponents';

const IngredientComponentsContainer = ({ ingredients, selectedIngredients, onSelect }) => {
  return (
    <IngredientComponents
      ingredients={ingredients}
      selectedIngredients={selectedIngredients}
      onSelect={onSelect}
    />
  );
};

export default IngredientComponentsContainer;