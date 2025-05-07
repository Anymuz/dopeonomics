// src/components/ProductionPlanning/ProductionCreationModal.jsx
import { useState } from 'react';
import { useProductionPlans } from '@hooks';

const ProductionCreationModal = ({ strains, onClose }) => {
  const { addPlan } = useProductionPlans();
  const [selectedStrainId, setSelectedStrainId] = useState('');
  const [batchSize, setBatchSize] = useState(10);
  const [customName, setCustomName] = useState('');

  const handleSubmit = () => {
    const strainId = Number(selectedStrainId);
    const base = strains.find((s) => s.id === strainId);
    if (!base) {
      alert('No valid strain selected.');
      return;
    }

    const newPlan = {
      id: Date.now(),
      name: customName || base.name,
      description: `Queued from strain: ${base.name}`,
      batchSize: Number(batchSize),
      strainId: base.id,
      drugType: base.seed?.drugType || 'unknown',
      ingredients: base.ingredients,
      effects: base.effects,
      quality: base.quality,
      status: 'Planned',
    };

    console.log('[DEBUG] Dispatching new production plan:', newPlan);
    addPlan(newPlan);
    onClose();
  };

  return (
    <div className="p-4 bg-white rounded shadow border w-full max-w-md">
      <h3 className="text-xl font-semibold mb-2">Create New Production Plan</h3>

      <label className="block mb-1">Select Strain</label>
      <select
        value={selectedStrainId}
        onChange={(e) => setSelectedStrainId(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      >
        <option value="" disabled>Select a strain</option>
        {strains.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <label className="block mb-1">Plan Name (optional)</label>
      <input
        className="w-full border p-2 rounded mb-3"
        value={customName}
        onChange={(e) => setCustomName(e.target.value)}
        placeholder="Override name"
      />

      <label className="block mb-1">Batch Size</label>
      <input
        type="number"
        className="w-full border p-2 rounded mb-3"
        value={batchSize}
        onChange={(e) => setBatchSize(e.target.value)}
        min={1}
      />

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="px-3 py-1 bg-gray-400 text-white rounded">Cancel</button>
        <button onClick={handleSubmit} className="px-3 py-1 bg-green-600 text-white rounded">Confirm</button>
      </div>
    </div>
  );
};

export default ProductionCreationModal;
