import useGameStore from '../stores/GameStore.jsx';
// Quantity and Quality Selection Modal
import React, { useState, useEffect } from 'react';
import { Star, Info } from 'lucide-react';

const QuantityQualityModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  initialQuantity = 12, 
  drugType = 'weed' 
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [quality, setQuality] = useState('normal');
  
  // Reset values when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(initialQuantity);
      setQuality('normal');
    }
  }, [isOpen, initialQuantity]);

  if (!isOpen) return null;
  
  // Only show quality options for weed
  const showQualityOptions = drugType === 'weed';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Set Production Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How many units would you like to produce?
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          {showQualityOptions && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Quality
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setQuality('normal')}
                  className={`p-2 rounded-md border flex flex-col items-center ${
                    quality === 'normal' ? 'bg-blue-50 border-blue-500' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <Star className={`w-5 h-5 ${quality === 'normal' ? 'text-blue-500' : 'text-gray-400'}`} 
                        fill={quality === 'normal' ? '#3B82F6' : 'none'} />
                  <span className="text-sm mt-1">Normal</span>
                  <span className="text-xs text-gray-500">Base price</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setQuality('high')}
                  className={`p-2 rounded-md border flex flex-col items-center ${
                    quality === 'high' ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex">
                    <Star className={`w-5 h-5 ${quality === 'high' ? 'text-green-500' : 'text-gray-400'}`} 
                          fill={quality === 'high' ? '#10B981' : 'none'} />
                    <Star className={`w-5 h-5 ${quality === 'high' ? 'text-green-500' : 'text-gray-400'}`} 
                          fill={quality === 'high' ? '#10B981' : 'none'} />
                  </div>
                  <span className="text-sm mt-1">High</span>
                  <span className="text-xs text-gray-500">+50% price</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setQuality('heavenly')}
                  className={`p-2 rounded-md border flex flex-col items-center ${
                    quality === 'heavenly' ? 'bg-yellow-50 border-yellow-500' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex">
                    <Star className={`w-5 h-5 ${quality === 'heavenly' ? 'text-yellow-500' : 'text-gray-400'}`} 
                          fill={quality === 'heavenly' ? '#F59E0B' : 'none'} />
                    <Star className={`w-5 h-5 ${quality === 'heavenly' ? 'text-yellow-500' : 'text-gray-400'}`} 
                          fill={quality === 'heavenly' ? '#F59E0B' : 'none'} />
                    <Star className={`w-5 h-5 ${quality === 'heavenly' ? 'text-yellow-500' : 'text-gray-400'}`} 
                          fill={quality === 'heavenly' ? '#F59E0B' : 'none'} />
                  </div>
                  <span className="text-sm mt-1">Heavenly</span>
                  <span className="text-xs text-gray-500">+100% price</span>
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500 flex items-center">
                <Info className="inline-block w-3 h-3 mr-1" />
                Higher quality = higher price and addiction rate
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(quantity, quality)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantityQualityModal;