// src/utils/effects.js
export const applyInteractions = (currentEffects, newIngredient) => {
  if (!Array.isArray(currentEffects)) currentEffects = [];
  if (!newIngredient || !newIngredient.defaultEffect) return currentEffects;

  const interactions = newIngredient.interactions || [];

  const updated = currentEffects.map(effect => {
    const rule = interactions.find(i => i.if === effect);
    return rule ? rule.replaceWith : effect;
  });

  if (!updated.includes(newIngredient.defaultEffect)) {
    updated.push(newIngredient.defaultEffect);
  }

  return updated;
};
