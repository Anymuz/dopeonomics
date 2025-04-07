// Production Planning Component
import React, { useState, useEffect } from 'react';
import {
  Factory,
  Trash2,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  ShoppingCart,
  Info,
  RefreshCw,
  Copy,
  MoreHorizontal,
  Star
} from 'lucide-react';

// Production Planning Tab Component
const ProductionPlanningTab = ({ 
  strains, 
  productionPlans, 
  updateProductionPlan, 
  markAsSold, 
  removeProductionPlan,
  reproduceProductionPlan,
  drugTypes
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <Factory className="mr-2 w-6 h-6 text-indigo-500" />
        Production Planning
      </h2>

      <ProductionPlanningContent 
        productionPlans={productionPlans} 
        updateProductionPlan={updateProductionPlan}
        markAsSold={markAsSold}
        removeProductionPlan={removeProductionPlan}
        reproduceProductionPlan={reproduceProductionPlan}
        drugTypes={drugTypes}
      />
    </div>
  );
};

// Production Planning Content
const ProductionPlanningContent = ({ 
  productionPlans, 
  updateProductionPlan, 
  markAsSold, 
  removeProductionPlan,
  reproduceProductionPlan,
  drugTypes
}) => {
  const [expandedPlanId, setExpandedPlanId] = useState(null);

  const toggleExpandPlan = (id) => {
    setExpandedPlanId(expandedPlanId === id ? null : id);
  };

  return (
    <div>
      {productionPlans.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <Factory className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No production plans</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add strains to production from the Strain Creator tab.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {productionPlans.map(plan => (
            <ProductionPlanCard 
              key={plan.id}
              plan={plan}
              isExpanded={expandedPlanId === plan.id}
              onToggleExpand={() => toggleExpandPlan(plan.id)}
              onUpdatePlan={updateProductionPlan}
              onMarkAsSold={markAsSold}
              onRemove={removeProductionPlan}
              onReproduce={reproduceProductionPlan}
              drugTypes={drugTypes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Tooltip Component for Buttons
const TooltipButton = ({ onClick, icon, title, className, disabled = false }) => (
  <div className="relative group">
    <button
      onClick={onClick}
      className={className}
      title={title}
      disabled={disabled}
    >
      {icon}
    </button>
    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
      {title}
    </div>
  </div>
);

// Quantity Modal Component with Quality Selection
const QuantityModal = ({ isOpen, onClose, onConfirm, initialQuantity = 12, drugType = 'weed' }) => {
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

// Quality Selector Component
const QualitySelector = ({ quality, onChange, disabled, drugType }) => {
  // Only show quality selector for weed
  if (drugType !== 'weed') return null;
  
  const qualities = [
    { id: 'normal', name: 'Normal', color: 'blue', multiplier: 1.0, addiction: 0 },
    { id: 'high', name: 'High', color: 'green', multiplier: 1.5, addiction: 0.15 },
    { id: 'heavenly', name: 'Heavenly', color: 'gold', multiplier: 2.0, addiction: 0.3 }
  ];

  return (
    <div className="mt-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Product Quality
      </label>
      <div className="flex gap-2">
        {qualities.map(q => (
          <button
            key={q.id}
            type="button"
            onClick={() => onChange(q.id)}
            disabled={disabled}
            className={`flex-1 p-2 rounded-md border flex flex-col items-center transition-colors ${
              quality === q.id 
                ? q.color === 'blue' ? 'bg-blue-50 border-blue-500' 
                : q.color === 'green' ? 'bg-green-50 border-green-500' 
                : 'bg-yellow-50 border-yellow-500'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center">
              {q.id === 'normal' && (
                <Star 
                  className={`w-5 h-5 ${quality === q.id ? 'text-blue-500' : 'text-gray-400'}`} 
                  fill={quality === q.id ? '#3B82F6' : 'none'} 
                />
              )}
              {q.id === 'high' && (
                <>
                  <Star className={`w-5 h-5 ${quality === q.id ? 'text-green-500' : 'text-gray-400'}`} 
                        fill={quality === q.id ? '#10B981' : 'none'} />
                  <Star className={`w-5 h-5 ${quality === q.id ? 'text-green-500' : 'text-gray-400'}`} 
                        fill={quality === q.id ? '#10B981' : 'none'} />
                </>
              )}
              {q.id === 'heavenly' && (
                <>
                  <Star className={`w-5 h-5 ${quality === q.id ? 'text-yellow-500' : 'text-gray-400'}`} 
                        fill={quality === q.id ? '#F59E0B' : 'none'} />
                  <Star className={`w-5 h-5 ${quality === q.id ? 'text-yellow-500' : 'text-gray-400'}`} 
                        fill={quality === q.id ? '#F59E0B' : 'none'} />
                  <Star className={`w-5 h-5 ${quality === q.id ? 'text-yellow-500' : 'text-gray-400'}`} 
                        fill={quality === q.id ? '#F59E0B' : 'none'} />
                </>
              )}
            </div>
            <span className="text-sm mt-1">{q.name}</span>
            <span className="text-xs text-gray-500">
              {q.multiplier > 1 ? `+${((q.multiplier - 1) * 100).toFixed(0)}%` : 'Base'}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-1 text-xs text-gray-500 flex items-center">
        <Info className="w-3 h-3 mr-1" />
        Higher quality = higher price and addiction rate
      </div>
    </div>
  );
};

// Production Plan Card Component
const ProductionPlanCard = ({ 
  plan, 
  isExpanded, 
  onToggleExpand, 
  onUpdatePlan, 
  onMarkAsSold, 
  onRemove,
  onReproduce,
  drugTypes
}) => {
  const [plannedQuantity, setPlannedQuantity] = useState(plan.plannedQuantity);
  const [quality, setQuality] = useState(plan.quality || 'normal');
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  useEffect(() => {
    setPlannedQuantity(plan.plannedQuantity);
    setQuality(plan.quality || 'normal');
  }, [plan.plannedQuantity, plan.quality]);

  const handleQuantityChange = (e) => {
    const newQty = Math.max(1, parseInt(e.target.value) || 0);
    setPlannedQuantity(newQty);
  };

  const handleUpdatePlan = () => {
    const updates = {};
    
    if (plannedQuantity !== plan.plannedQuantity) {
      updates.plannedQuantity = plannedQuantity;
    }
    
    if (quality !== plan.quality) {
      updates.quality = quality;
    }
    
    if (Object.keys(updates).length > 0) {
      onUpdatePlan(plan.id, updates);
    }
  };

  const handleReproduce = () => {
    setShowQuantityModal(true);
  };

  const confirmReproduce = (quantity, quality) => {
    onReproduce(plan, quantity, quality);
    setShowQuantityModal(false);
  };

  // Format date to a readable string
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleActionsMenu = (e) => {
    e.stopPropagation();
    setShowActionsMenu(!showActionsMenu);
  };

  // Get drug type emoji
  const getDrugTypeEmoji = (drugType) => {
    return drugTypes[drugType]?.emoji || '🌿';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <span className="text-xl">{getDrugTypeEmoji(plan.drugType)}</span>
          <div>
            <h3 className="font-medium text-gray-900">{plan.strainName}</h3>
            <p className="text-sm text-gray-500">
              Created: {formatDate(plan.dateCreated)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Actions with Tooltips */}
          <TooltipButton
            onClick={() => onMarkAsSold(plan.id)}
            icon={<DollarSign className="h-5 w-5" />}
            title="Mark as sold"
            className="p-1.5 text-green-600 hover:bg-green-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={plan.status === 'sold'}
          />
          
          <TooltipButton
            onClick={handleReproduce}
            icon={<Copy className="h-5 w-5" />}
            title="Produce this strain again"
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
          />
          
          <TooltipButton
            onClick={() => onRemove(plan.id)}
            icon={<Trash2 className="h-5 w-5" />}
            title="Remove plan"
            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
          />
          
          <TooltipButton
            onClick={onToggleExpand}
            icon={<Info className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />}
            title={isExpanded ? "Collapse details" : "Show details"}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
          />
          
          {/* Actions Menu Toggle */}
          <div className="relative">
            <TooltipButton
              onClick={toggleActionsMenu}
              icon={<MoreHorizontal className="h-5 w-5" />}
              title="More actions"
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
            />
            
            {/* Dropdown Menu */}
            {showActionsMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onMarkAsSold(plan.id);
                      setShowActionsMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${plan.status === 'sold' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                    disabled={plan.status === 'sold'}
                  >
                    <DollarSign className="inline h-4 w-4 mr-2" />
                    Mark as Sold
                  </button>
                  <button
                    onClick={() => {
                      handleReproduce();
                      setShowActionsMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Copy className="inline h-4 w-4 mr-2" />
                    Produce Again
                  </button>
                  <button
                    onClick={onToggleExpand}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Info className="inline h-4 w-4 mr-2" />
                    {isExpanded ? "Hide Details" : "View Details"}
                  </button>
                  <button
                    onClick={() => {
                      onRemove(plan.id);
                      setShowActionsMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="inline h-4 w-4 mr-2" />
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Planned Quantity
            </label>
            <div className="flex">
              <input
                type="number"
                min="1"
                value={plannedQuantity}
                onChange={handleQuantityChange}
                className="flex-1 p-2 border rounded-l-md"
                disabled={plan.status === 'sold'}
              />
              <TooltipButton
                onClick={handleUpdatePlan}
                icon={<RefreshCw className="w-5 h-5" />}
                title="Update quantity"
                className="bg-blue-500 text-white px-3 py-1 rounded-r-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={(plannedQuantity === plan.plannedQuantity && quality === plan.quality) || plan.status === 'sold'}
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className={`py-2 px-3 rounded text-center font-medium ${
              plan.status === 'sold' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
            </div>
          </div>
        </div>

        {/* Quality Selector */}
        {plan.drugType === 'weed' && (
          <QualitySelector 
            quality={quality}
            onChange={setQuality}
            disabled={plan.status === 'sold'}
            drugType={plan.drugType}
          />
        )}

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded">
            <h4 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <ShoppingCart className="w-4 h-4 mr-1" />
              Production Cost
            </h4>
            <p className="text-lg font-semibold">${plan.productionCost.toFixed(2)}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded">
            <h4 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <ShoppingBag className="w-4 h-4 mr-1" />
              Expected Revenue
            </h4>
            <p className="text-lg font-semibold">${plan.expectedRevenue.toFixed(2)}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded">
            <h4 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              Expected Profit
            </h4>
            <p className="text-lg font-semibold text-green-600">${plan.expectedProfit.toFixed(2)}</p>
          </div>
        </div>

        {/* Produce Again Button (more prominent especially for sold items) */}
        {plan.status === 'sold' && (
          <button
            onClick={handleReproduce}
            className="mt-4 w-full flex items-center justify-center py-2 px-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors rounded-md font-medium"
          >
            <Copy className="w-5 h-5 mr-2" />
            Produce This Strain Again
          </button>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 bg-gray-50">
          {/* Quality Details (show only for weed products) */}
          {plan.drugType === 'weed' && plan.quality && (
            <div className="mb-4 bg-white p-3 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Quality Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">Quality Level:</div>
                <div className="font-medium flex items-center">
                  {plan.quality === 'normal' && (
                    <Star className="w-4 h-4 text-blue-500 fill-current mr-1" />
                  )}
                  {plan.quality === 'high' && (
                    <>
                      <Star className="w-4 h-4 text-green-500 fill-current mr-1" />
                      <Star className="w-4 h-4 text-green-500 fill-current mr-1" />
                    </>
                  )}
                  {plan.quality === 'heavenly' && (
                    <>
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    </>
                  )}
                  {plan.quality.charAt(0).toUpperCase() + plan.quality.slice(1)}
                </div>
                
                <div className="text-gray-600">Price Multiplier:</div>
                <div className="font-medium">
                  {plan.quality === 'normal' ? '1.0x' : 
                   plan.quality === 'high' ? '1.5x' : 
                   plan.quality === 'heavenly' ? '2.0x' : '1.0x'}
                </div>
                
                <div className="text-gray-600">Base Price:</div>
                <div className="font-medium">${plan.originalPrice || plan.salePrice}</div>
                
                <div className="text-gray-600">Final Price:</div>
                <div className="font-medium">${plan.salePrice}</div>
                
                {plan.quality !== 'normal' && (
                  <>
                    <div className="text-gray-600">Drying Time:</div>
                    <div className="font-medium">
                      {plan.quality === 'high' ? '12' : plan.quality === 'heavenly' ? '24' : '0'} hours
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <h4 className="font-medium text-gray-900 mb-3">Required Ingredients</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ingredient
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {plan.totalIngredientNeeds.map((ingredient, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {ingredient.name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                      {ingredient.quantity}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                      ${ingredient.totalCost.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    Packaging ({plan.packagingNeeded.type})
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {plan.packagingNeeded.quantity}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    ${plan.packagingNeeded.cost.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quantity Modal */}
      <QuantityModal
        isOpen={showQuantityModal}
        onClose={() => setShowQuantityModal(false)}
        onConfirm={confirmReproduce}
        initialQuantity={plan.plannedQuantity}
        drugType={plan.drugType}
      />
    </div>
  );
};

export { ProductionPlanningTab };