// src/components/EffectBuilder/EffectBuilderTab.jsx
/* eslint-disable no-unused-vars */

import React from 'react';
import { Beaker, RotateCcw, X, Check } from 'lucide-react';
import { effectDetails } from '@data/straindata';

const EffectBuilderTab = ({
  selectedEffects,
  setSelectedEffects,
  selectedDrugType,
  setSelectedDrugType,
  drugTypes,
  effectColors,
  ingredients,
  seedTypes,
  effectSearchTerm,
  setEffectSearchTerm,
  effectSortOrder,
  setEffectSortOrder,
  effectTypeFilter,
  setEffectTypeFilter,
  handleSearch,
  resetSelections,
  isSearching,
  searchProgress,
  solutionFound,
  bestSolution,
  searchResults,
  calculateEffectMatchPercentage,
}) => {
  const allEffects = Object.keys(effectColors).sort();

  const toggleEffect = (effect) => {
    if (selectedEffects.includes(effect)) {
      setSelectedEffects((prev) => prev.filter((e) => e !== effect));
    } else if (selectedEffects.length < 8) {
      setSelectedEffects((prev) => [...prev, effect]);
    }
  };

  const filteredAndSortedEffects = () => {
    let filtered = allEffects.filter((effect) =>
      effect.toLowerCase().includes(effectSearchTerm.toLowerCase())
    );

    if (effectTypeFilter !== 'all') {
      filtered = filtered.filter(
        (effect) => effectDetails[effect]?.type === effectTypeFilter
      );
    }

    if (effectSortOrder === 'type') {
      return filtered.sort(
        (a, b) =>
          (effectDetails[a]?.type || '').localeCompare(effectDetails[b]?.type || '') ||
          a.localeCompare(b)
      );
    }

    if (effectSortOrder === 'value') {
      return filtered.sort(
        (a, b) =>
          (effectDetails[b]?.multiplier || 0) - (effectDetails[a]?.multiplier || 0)
      );
    }

    return filtered;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Beaker className="mr-2" /> Effect Builder
      </h2>

      {/* Drug Type Selector */}
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Select Drug Type</h3>
        <div className="flex gap-2">
          {Object.entries(drugTypes).map(([key, { name, emoji }]) => (
            <button
              key={key}
              onClick={() => setSelectedDrugType(key)}
              className={`px-3 py-2 rounded border ${
                selectedDrugType === key
                  ? 'bg-blue-100 border-blue-400'
                  : 'bg-gray-100 border-gray-300'
              }`}
            >
              {emoji} {name}
            </button>
          ))}
        </div>
      </div>

      {/* Search Effects */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Search Effects</label>
          <span className="text-xs text-gray-500">
            {selectedEffects.length}/8 selected
          </span>
        </div>
        <div className="relative mb-2">
          <input
            type="text"
            value={effectSearchTerm}
            onChange={(e) => setEffectSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Search effects..."
          />
          {effectSearchTerm && (
            <button
              onClick={() => setEffectSearchTerm('')}
              className="absolute top-2 right-3 text-gray-400 hover:text-black"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex gap-2 mb-2">
          <select
            value={effectTypeFilter}
            onChange={(e) => setEffectTypeFilter(e.target.value)}
            className="p-1 border rounded"
          >
            <option value="all">All Types</option>
            <option value="Ability">Ability</option>
            <option value="Cosmetic">Cosmetic</option>
          </select>
          <select
            value={effectSortOrder}
            onChange={(e) => setEffectSortOrder(e.target.value)}
            className="p-1 border rounded"
          >
            <option value="alphabetical">Alphabetical</option>
            <option value="type">By Type</option>
            <option value="value">By Value</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-72 overflow-y-auto">
          {filteredAndSortedEffects().map((effect) => {
            const selected = selectedEffects.includes(effect);
            const bgColor = effectColors[effect] || '#333';
            return (
              <button
                key={effect}
                onClick={() => toggleEffect(effect)}
                className={`p-2 rounded text-white text-sm flex justify-between items-center ${
                  selected ? 'ring-2 ring-white' : 'opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: bgColor }}
              >
                <span>{effect}</span>
                {selected && <Check className="w-4 h-4 ml-2" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleSearch}
          disabled={isSearching || selectedEffects.length === 0}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
        >
          Find Recipe
        </button>
        <button
          onClick={resetSelections}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
        >
          <RotateCcw size={16} className="inline mr-1" />
          Reset
        </button>
      </div>

      {/* Progress */}
      {isSearching && (
        <div className="mb-4">
          <div className="text-sm text-gray-700 mb-1">
            Searching... {Math.round(searchProgress)}%
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${searchProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          {searchResults.map((res, index) => (
            <div key={index} className="border rounded p-3 bg-white shadow">
              <div className="font-bold">{res.seed.name}</div>
              <div className="text-sm">Ingredients: {res.ingredients.map(i => i.name).join(', ')}</div>
              <div className="text-sm">Effects: {res.allEffects.join(', ')}</div>
              <div className="text-xs text-gray-500">
                Match: {Math.round(calculateEffectMatchPercentage(res))}%
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EffectBuilderTab;

