// src/hooks/ingredientsHook.jsx
import useGameStore from '@stores/GameStore';

const useIngredients = () => {
  const ingredients = useGameStore((state) => state.ingredients);
  const setIngredients = useGameStore((state) => state.setIngredients);
  const resetIngredients = useGameStore((state) => state.resetIngredients);

  return {
    ingredients,
    setIngredients,
    resetIngredients,
  };
};

export default useIngredients;
