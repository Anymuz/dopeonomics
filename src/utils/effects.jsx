export const applyInteractions = (seedEffect, ingredients = [], maxEffects = 8) => {
  let effects = [seedEffect];

  for (const ingredient of ingredients) {
    const interactions = ingredient.interactions || [];

    for (const interaction of interactions) {
      const index = effects.indexOf(interaction.if);
      if (index !== -1) {
        effects[index] = interaction.replaceWith;
      }
    }

    if (!effects.includes(ingredient.defaultEffect)) {
      if (effects.length < maxEffects) {
        effects.push(ingredient.defaultEffect);
      }
    }
  }

  return {
    finalEffects: effects
  };
};

export default applyInteractions;
