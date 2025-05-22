// src/components/Production/ProductionCreationModal.jsx
import React, { useState } from 'react';
import { calculateProductionCost, calculateRecommendedPrice } from '@/utils/pricing';

const ProductionCreationModal = ({ onClose, addPlan, strains }) => {
  const [selectedStrainId, setSelectedStrainId] = useState('');
  const [batchSize, setBatchSize] = useState(1);
  const [customName, setCustomName] = useState('');

  const handleSubmit = () => {
    const strain = strains.find((s) => s.id === Number(selectedStrainId));
    if (!strain || batchSize <= 0) {
      alert('Please select a valid strain and batch size.');
      return;
    }

    const totalCost = calculateProductionCost(strain.ingredients) * batchSize;
    const unitPrice = calculateRecommendedPrice({ effects: strain.effects, quality: strain.quality });
    const salePrice = unitPrice * batchSize;

    const newPlan = {
      id: Date.now(), // Temporary unique ID
      name: customName.trim() !== '' ? customName.trim() : strain.name,
      strainId: strain.id,
      drugType: strain.drugType,
      effects: strain.effects,
      ingredients: strain.ingredients,
      plannedQuantity: batchSize,
      totalCost,
      salePrice,
      status: 'Planned',
    };

    addPlan(newPlan);
    onClose();
  };

  return (
    <div className="modal bg-white border rounded p-6 max-w-lg mx-auto shadow-lg z-50">
      <h2 className="text-lg font-bold mb-4">Create Production Plan</h2>

      <label className="block mb-2 text-sm font-medium text-gray-700">Select Strain:</label>
      <select
        value={selectedStrainId}
        onChange={(e) => setSelectedStrainId(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">-- Select --</option>
        {strains.map((strain) => (
          <option key={strain.id} value={strain.id}>
            {strain.name}
          </option>
        ))}
      </select>

      <label className="block mb-2 text-sm font-medium text-gray-700">Custom Name (optional):</label>
      <input
        type="text"
        value={customName}
        onChange={(e) => setCustomName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        placeholder="e.g. Benji's Batch #5"
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">Batch Size:</label>
      <input
        type="number"
        min={1}
        value={batchSize}
        onChange={(e) => setBatchSize(parseInt(e.target.value))}
        className="w-full p-2 mb-6 border rounded"
      />

      <div className="flex justify-end gap-4">
        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ProductionCreationModal;
