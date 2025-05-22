import React, { useState, useEffect } from 'react';

const ProductionPlanCard = ({ plan, addPlan, onUpdate, onAdvance, onDelete }) => {
  const [quantity, setQuantity] = useState(plan.plannedQuantity);
  const [pricePerUnit, setPricePerUnit] = useState(
    plan.salePrice ? plan.salePrice / plan.plannedQuantity : 0
  );
  const [ingredientsChecked, setIngredientsChecked] = useState(() =>
    plan.ingredients?.map((ing) => ({ name: ing.name, checked: false }))
  );
  const [cookingSteps, setCookingSteps] = useState([]);
  const [dealerQuantity, setDealerQuantity] = useState(0);
  const dealerCut = 0.2;

  const totalCost = plan.totalCost ?? 0;
  const totalRevenue = pricePerUnit * quantity;
  const profit = totalRevenue - totalCost;
  const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

  useEffect(() => {
    if (
      plan.status === 'Planned' &&
      (plan.plannedQuantity !== quantity ||
        plan.salePrice !== pricePerUnit * quantity)
    ) {
      const updated = {
        ...plan,
        plannedQuantity: quantity,
        salePrice: pricePerUnit * quantity,
      };
      onUpdate && onUpdate(updated);

    } else  if (plan.status === 'Cooking' && cookingSteps.length === 0) {
    const steps = [
      { name: plan.seed, checked: false },
      ...plan.ingredients.map((i) => ({ name: i.name, checked: false }))
    ];
    setCookingSteps(steps);
  }
  }, [quantity, pricePerUnit, onUpdate, plan, cookingSteps.length]);

  const handleIngredientToggle = (name) => {
    const updated = ingredientsChecked.map((ing) =>
      ing.name === name ? { ...ing, checked: !ing.checked } : ing
    );
    setIngredientsChecked(updated);
  };

  const handleStepToggle = (index) => {
    setCookingSteps((prev) =>
      prev.map((step, i) =>
        i === index ? { ...step, checked: !step.checked } : step
      )
    );
  };

  const renderStatusTag = (status) => {
    const statusColors = {
      Planned: 'text-blue-600',
      Ingredients: 'text-yellow-600',
      Cooking: 'text-purple-600',
      Selling: 'text-green-600',
      Sold: 'text-gray-600',
    };
    return <span className={`${statusColors[status] || 'text-gray-400'} font-semibold`}>{status}</span>;
  };

  return (
    <div className="border p-4 rounded bg-white shadow-sm mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold">{plan.name}</h3>
          <p className="text-sm text-gray-600">Drug Type: {plan.drugType}</p>
        </div>
        <div>{renderStatusTag(plan.status)}</div>
      </div>

      {plan.status === 'Planned' && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Batch Quantity</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price per Unit ($)</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={pricePerUnit.toFixed(2)}
                onChange={(e) => setPricePerUnit(parseFloat(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div className="mb-2 text-sm">
            <p>Total Cost: ${totalCost.toFixed(2)}</p>
            <p>Expected Revenue: ${totalRevenue.toFixed(2)}</p>
            <p className="mb-1">Profit: ${profit.toFixed(2)}</p>
            <div className="h-2 w-full bg-gray-200 rounded">
              <div
                className="h-2 bg-green-500 rounded"
                style={{ width: `${Math.min(profitMargin, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => onAdvance(plan.id, 'Ingredients')}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Proceed to Ingredients
            </button>
            <button
              onClick={() => onDelete(plan.id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        </>
      )}

      {plan.status === 'Ingredients' && (
        <>
          <p className="text-sm font-medium mb-2">Ingredient Checklist:</p>
          <ul className="mb-3">
            {ingredientsChecked.map((ing) => (
              <li key={ing.name} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={ing.checked}
                  onChange={() => handleIngredientToggle(ing.name)}
                />
                <span>{ing.name}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => onAdvance(plan.id, 'Cooking')}
            className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
          >
            Proceed to Cooking
          </button>
        </>
      )}

      {plan.status === 'Cooking' && (
        <>
          <p className="text-sm font-medium mb-2">Cooking Steps:</p>
          <ul className="mb-3">
            {cookingSteps.map((step, index) => (
              <li key={step.name} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  disabled={index > 0 && !cookingSteps[index - 1].checked}
                  checked={step.checked}
                  onChange={() => handleStepToggle(index)}
                />
                <span>{step.name}</span>
              </li>
            ))}
          </ul>
          {cookingSteps.every((s) => s.checked) && (
            <button
              onClick={() => onAdvance(plan.id, 'Selling')}
              className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
            >
              Finish Cooking
            </button>
          )}
        </>
      )}

      {plan.status === 'Selling' && (
      <>
        <p className="text-sm font-medium mb-2">Selling Allocation:</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">Dealer Quantity</label>
            <input
              type="number"
              min={0}
              max={plan.plannedQuantity}
              value={dealerQuantity}
              onChange={(e) => setDealerQuantity(Math.min(parseInt(e.target.value) || 0, plan.plannedQuantity))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Personal Quantity</label>
            <input
              type="number"
              readOnly
              value={Math.max(0, plan.plannedQuantity - dealerQuantity)}
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
        </div>

        <div className="text-sm text-gray-700 mb-4">
          <p>Unit Price: ${((plan.salePrice ?? 0) / plan.plannedQuantity).toFixed(2)}</p>
          <p>Dealer Keeps: ${((dealerQuantity * (plan.salePrice / plan.plannedQuantity)) * dealerCut).toFixed(2)}</p>
          <p>Personal Revenue: ${(Math.max(0, plan.plannedQuantity - dealerQuantity) * (plan.salePrice / plan.plannedQuantity)).toFixed(2)}</p>
          <p className="font-semibold mt-2">
            Total Revenue: ${((plan.salePrice ?? 0) - (dealerQuantity * (plan.salePrice / plan.plannedQuantity)) * dealerCut).toFixed(2)}
          </p>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => onAdvance(plan.id, 'Sold')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Complete Sale
          </button>
          <button
            onClick={() => onDelete(plan.id)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Cancel Plan
          </button>
        </div>
      </>
    )}

    {plan.status === 'Sold' && (
      <>
        <p className="text-sm font-medium mb-2">Final Summary:</p>
        <div className="text-sm text-gray-700 space-y-1 mb-4">
          <p>Strain: {plan.name}</p>
          <p>Drug Type: {plan.drugType}</p>
          <p>Quantity Sold: {plan.plannedQuantity}</p>
          <p>Unit Price: ${(plan.salePrice / plan.plannedQuantity).toFixed(2)}</p>
          <p>Total Revenue: ${plan.salePrice.toFixed(2)}</p>
          <p>Total Cost: ${plan.totalCost.toFixed(2)}</p>
          <p className="font-semibold">
            Net Profit: ${(plan.salePrice - plan.totalCost).toFixed(2)}
          </p>
        </div>

         <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              const newPlan = {
                ...plan,
                id: Date.now(),
                name: `${plan.name}`,
                status: 'Planned',
              };
              addPlan(newPlan);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Produce Again
          </button>

          <button
            onClick={() => onDelete(plan.id)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Delete Plan
          </button>
        </div>
      </>
    )}

    </div>
  );
};

export default ProductionPlanCard;
