// src/components/MyStrains/MyStrainsTab.jsx
import React from 'react';
import {
  Trash2,
  Factory,
  Star,
  Heart,
} from 'lucide-react';

const StrainTable = ({ title, mixes, highlight, onFavorite, onDelete, onCreatePlan }) => {
  const bgClass = highlight ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-gray-200';
  const titleColor = highlight ? 'text-yellow-700' : 'text-green-700';
  const Icon = highlight ? Star : Heart;

  return (
    <div className={`mb-6 border rounded-xl shadow ${bgClass}`}>
      <div className={`px-4 py-3 border-b ${highlight ? 'bg-yellow-100' : 'bg-gray-100'} rounded-t-xl`}>
        <h3 className={`text-xl font-semibold flex items-center gap-2 ${titleColor}`}>
          <Icon className={highlight ? 'text-yellow-500' : 'text-green-600'} size={20} />
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="p-3">Type</th>
              <th className="p-3">Name</th>
              <th className="p-3">Base</th>
              <th className="p-3">Effects</th>
              <th className="p-3">Cost</th>
              <th className="p-3">Price</th>
              <th className="p-3">Profit</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mixes.map((mix) => {
              const profit = mix.salePrice - mix.totalCost;
              return (
                <tr key={mix.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 capitalize">{mix.drugType || 'N/A'}</td>
                  <td className="p-3 font-semibold">{mix.name}</td>
                  <td className="p-3 text-purple-600">{mix.seed?.name || 'N/A'}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {mix.effects.map((effect, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800"
                        >
                          {effect}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">${mix.totalCost.toFixed(0)}</td>
                  <td className="p-3 text-blue-600 font-medium">${mix.salePrice.toFixed(0)}</td>
                  <td className="p-3 text-green-600 font-medium">${profit.toFixed(0)}</td>
                  <td className="p-3 flex gap-2 items-center">
                    <button
                      onClick={() => onFavorite(mix.id)}
                      title="Favorite"
                      className={`hover:text-yellow-500 ${mix.favorite ? 'text-yellow-500' : 'text-gray-400'}`}
                    >
                      <Star fill={mix.favorite ? 'currentColor' : 'none'} size={18} />
                    </button>
                    <button
                      onClick={() => onCreatePlan(mix)}
                      title="Create Production Plan"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Factory size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(mix.id)}
                      title="Delete"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {mixes.length === 0 && (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-400">
                  No strains found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MyStrainsTab = ({ mixes, onFavorite, onDelete, onCreatePlan }) => {
  const favorites = mixes.filter((m) => m.favorite);

  return (
    <div className="p-6">
      {favorites.length > 0 && (
        <StrainTable
          title="Favorite Strains"
          mixes={favorites}
          highlight
          onFavorite={onFavorite}
          onDelete={onDelete}
          onCreatePlan={onCreatePlan}
        />
      )}
      <StrainTable
        title="Saved Strains"
        mixes={mixes}
        onFavorite={onFavorite}
        onDelete={onDelete}
        onCreatePlan={onCreatePlan}
      />
    </div>
  );
};

export default MyStrainsTab;
