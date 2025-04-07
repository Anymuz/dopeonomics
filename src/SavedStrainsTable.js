// Updated SavedStrainsTable with filtering and favoriting
import React, { useState } from 'react';
import { 
  Trash2, 
  Factory, 
  Search, 
  Star, 
  Filter, 
  X, 
  ChevronUp, 
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';

export const SavedStrainsTable = ({ 
  mixes, 
  filterOptions,
  setFilterOptions, 
  handleSort, 
  sortColumn,
  sortDirection,
  removeMix,
  addToProduction,
  toggleFavorite,
  effectColors,
  drugTypes
}) => {
  const [showFilters, setShowFilters] = useState(false);

  // Get drug type emoji
  const getDrugTypeEmoji = (drugType) => {
    return drugTypes[drugType]?.emoji || '🌿';
  };

  // Function to render sort indicator
  const renderSortIndicator = (column) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="w-4 h-4 ml-1 inline-block text-gray-400" />;
    }
    
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 ml-1 inline-block text-blue-500" />
      : <ChevronDown className="w-4 h-4 ml-1 inline-block text-blue-500" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Saved Strains</h2>

      {/* Search and Filter Controls */}
      <div className="mb-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search by name..."
              value={filterOptions.name}
              onChange={(e) => setFilterOptions({...filterOptions, name: e.target.value})}
              className="w-full p-2 pl-9 text-sm border rounded-md"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            {filterOptions.name && (
              <button 
                onClick={() => setFilterOptions({...filterOptions, name: ''})}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center px-3 py-2 text-sm rounded-md ml-2 ${
              Object.values(filterOptions).some(val => val && val !== filterOptions.name)
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Filter className="w-4 h-4 mr-1" />
            Filters
            {Object.values(filterOptions).some(val => val && val !== filterOptions.name) && (
              <span className="ml-1 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {Object.values(filterOptions).filter(val => val && val !== filterOptions.name).length}
              </span>
            )}
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Drug Type</label>
                <select
                  value={filterOptions.drugType || ''}
                  onChange={(e) => setFilterOptions({...filterOptions, drugType: e.target.value})}
                  className="w-full p-2 text-sm border rounded-md"
                >
                  <option value="">All Types</option>
                  {Object.entries(drugTypes).map(([key, value]) => (
                    <option key={key} value={key}>{value.emoji} {value.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Seed Type</label>
                <input
                  type="text"
                  placeholder="Filter by seed"
                  value={filterOptions.seedType}
                  onChange={(e) => setFilterOptions({...filterOptions, seedType: e.target.value})}
                  className="w-full p-2 text-sm border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Effect</label>
                <input
                  type="text"
                  placeholder="Filter by effect"
                  value={filterOptions.effect}
                  onChange={(e) => setFilterOptions({...filterOptions, effect: e.target.value})}
                  className="w-full p-2 text-sm border rounded-md"
                />
              </div>
            </div>
            <button
              className="mt-3 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 text-sm rounded"
              onClick={() => setFilterOptions({name: filterOptions.name, seedType: '', drugType: '', effect: ''})}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="strain-table">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <span className="flex items-center">
                  Name {renderSortIndicator('name')}
                </span>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('seed')}
              >
                <span className="flex items-center">
                  Base {renderSortIndicator('seed')}
                </span>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effects</th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('totalCost')}
              >
                <span className="flex items-center">
                  Cost {renderSortIndicator('totalCost')}
                </span>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('salePrice')}
              >
                <span className="flex items-center">
                  Price {renderSortIndicator('salePrice')}
                </span>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('profit')}
              >
                <span className="flex items-center">
                  Profit {renderSortIndicator('profit')}
                </span>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mixes.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No strains found. Create a new strain to get started.
                </td>
              </tr>
            ) : (
              mixes.map(mix => (
                <tr key={mix.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xl" title={drugTypes[mix.drugType]?.name || 'Weed'}>
                      {getDrugTypeEmoji(mix.drugType)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{mix.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-purple-600">
                      <span className="text-xl mr-2">{getDrugTypeEmoji(mix.drugType)}</span>
                      <span>{mix.seed.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {mix.effects && mix.effects.map((effect, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-white rounded-full text-xs"
                          style={{ backgroundColor: effectColors[effect] || 'gray' }}
                        >
                          {effect}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">${Math.round(mix.totalCost)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium">${mix.salePrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    <span className={mix.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                      ${Math.round(mix.profit)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button
                      onClick={() => toggleFavorite(mix.id)}
                      className={`transition-colors ${mix.favorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                      title={mix.favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Star className="w-5 h-5" fill={mix.favorite ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={() => addToProduction(mix.id)}
                      className="text-indigo-600 hover:text-indigo-900 transition-colors"
                      title="Add to production"
                    >
                      <Factory className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => removeMix(mix.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                      title="Delete strain"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};