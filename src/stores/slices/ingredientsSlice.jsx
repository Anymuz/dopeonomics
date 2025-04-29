// src/stores/slices/ingredientsSlice.jsx
export const createIngredientsSlice = (set) => ({
    ingredients: [],
  
    setIngredients: (newIngredients) => set({ ingredients: newIngredients }),
    resetIngredients: () => set({ ingredients: [] }),
  });
  
  