// Enhanced Production Plan Card Component
import React, { useState, useEffect } from 'react';
import { 
  DollarSign,
  Info,
  Copy,
  Trash2,
  MoreHorizontal,
  ShoppingCart,
  Beaker,
  Check,
  AlertTriangle,
  HelpCircle,
  RefreshCw,
  ChevronsRight
} from 'lucide-react';

// Import the quantity modal
import QuantityQualityModal from './QuantityQualityModal';

// Production Plan Card Component with workflow stages
const ProductionPlanCard = ({ 
  plan, 
  isExpanded, 
  onToggleExpand, 
  onUpdatePlan, 
  onMarkAsSold, 
  onRemove,
  onReproduce,
  drugTypes,
  dealers = [], // Added dealers prop
  setDailySales,
  setDealerTransactions,
  effectColors
}) => {
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);

  // State for purchased ingredients tracking
  const [purchasedIngredients, setPurchasedIngredients] = useState({});
  
  // State for cooking progress
  const [cookingSteps, setCookingSteps] = useState([]);

  // State for selling controls
  const [sellingData, setSellingData] = useState({
    personalQuantity: 0,
    dealerQuantity: 0,
    selectedDealer: '',
    personalPrice: plan.salePrice || 0
  });

  // Determine the current stage of production
  const [currentStage, setCurrentStage] = useState('plan'); // 'plan', 'buy', 'cook', 'sell'

  // Load saved stage and progress data when component mounts
  useEffect(() => {
    if (plan.productionStage) {
      setCurrentStage(plan.productionStage);
    }
    
    if (plan.purchasedIngredients) {
      setPurchasedIngredients(plan.purchasedIngredients);
    } else {
      // Initialize empty tracking for all ingredients
      const initialPurchased = {};
      plan.totalIngredientNeeds.forEach(ingredient => {
        initialPurchased[ingredient.name] = 0;
      });
      setPurchasedIngredients(initialPurchased);
    }

    if (plan.cookingSteps) {
      setCookingSteps(plan.cookingSteps);
    } else {
      // Initialize cooking steps based on the strain's ingredients
      const initialSteps = [];
      // The first step is always the base seed/precursor
      const seedIngredient = plan.totalIngredientNeeds.find(ing => 
        ing.name.includes('Seed') || ing.name.includes('Pseudo') || ing.name.includes('Coca')
      );
      
      if (seedIngredient) {
        initialSteps.push({
          id: 'seed',
          name: seedIngredient.name,
          completed: false
        });
      }

      // Add other ingredients as steps (excluding the seed and packaging)
      plan.totalIngredientNeeds.forEach(ingredient => {
        if (!ingredient.name.includes('Seed') && 
            !ingredient.name.includes('Pseudo') && 
            !ingredient.name.includes('Coca') &&
            !ingredient.name.includes('Baggie') && 
            !ingredient.name.includes('Jar')) {
          initialSteps.push({
            id: ingredient.name,
            name: ingredient.name,
            completed: false
          });
        }
      });
      
      setCookingSteps(initialSteps);
    }

    // Initialize selling data
    if (plan.sellingData) {
      setSellingData(plan.sellingData);
    } else {
      setSellingData({
        personalQuantity: 0,
        dealerQuantity: 0,
        selectedDealer: dealers.length > 0 ? dealers[0].id : '',
        personalPrice: plan.salePrice || 0
      });
    }
  }, [plan, dealers]);

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

  // Get drug type emoji
  const getDrugTypeEmoji = (drugType) => {
    return drugTypes[drugType]?.emoji || '🌿';
  };
  
  // Calculate progress percentage for the progress bar
  const calculateProgress = () => {
    if (plan.status === 'sold') return 100;
    
    switch (currentStage) {
      case 'plan':
        return 0;
      case 'buy':
        // Calculate percentage of purchased ingredients
        const totalNeeded = Object.values(plan.totalIngredientNeeds).reduce((sum, ing) => sum + ing.quantity, 0);
        const totalPurchased = Object.values(purchasedIngredients).reduce((sum, qty) => sum + qty, 0);
        return Math.min(100, Math.round((totalPurchased / totalNeeded) * 25 + 0)); // 0-25%
      case 'cook':
        // Calculate percentage of completed cooking steps
        const completedSteps = cookingSteps.filter(step => step.completed).length;
        return Math.min(100, Math.round((completedSteps / cookingSteps.length) * 25 + 25)); // 25-50%
      case 'sell':
        // Calculate based on sold quantity
        const totalQuantity = plan.plannedQuantity;
        const soldQuantity = sellingData.personalQuantity + sellingData.dealerQuantity;
        return Math.min(100, Math.round((soldQuantity / totalQuantity) * 25 + 50)); // 50-75%
      default:
        return 0;
    }
  };

  // Check if all ingredients are purchased
  const allIngredientsPurchased = () => {
    return plan.totalIngredientNeeds.every(ingredient => 
      (purchasedIngredients[ingredient.name] || 0) >= ingredient.quantity
    );
  };

  // Check if all cooking steps are completed
  const allCookingStepsCompleted = () => {
    return cookingSteps.every(step => step.completed);
  };

  // Check if all product is allocated for sale
  const allProductAllocated = () => {
    return (sellingData.personalQuantity + sellingData.dealerQuantity) >= plan.plannedQuantity;
  };

  // Handle toggle of purchased state for an ingredient
  const toggleIngredientPurchased = (ingredientName, purchased) => {
    const updatedPurchased = { ...purchasedIngredients };
    
    if (purchased) {
      // Mark as fully purchased
      const ingredient = plan.totalIngredientNeeds.find(ing => ing.name === ingredientName);
      if (ingredient) {
        updatedPurchased[ingredientName] = ingredient.quantity;
      }
    } else {
      // Mark as not purchased
      updatedPurchased[ingredientName] = 0;
    }
    
    setPurchasedIngredients(updatedPurchased);
    
    // Save to plan state
    onUpdatePlan(plan.id, {
      purchasedIngredients: updatedPurchased,
      productionStage: currentStage
    });
  };

  // Handle updating the purchased quantity for an ingredient
  const updatePurchasedQuantity = (ingredientName, quantity) => {
    const updatedPurchased = { ...purchasedIngredients };
    updatedPurchased[ingredientName] = Math.max(0, parseInt(quantity) || 0);
    
    setPurchasedIngredients(updatedPurchased);
    
    // Save to plan state
    onUpdatePlan(plan.id, {
      purchasedIngredients: updatedPurchased,
      productionStage: currentStage
    });
  };

  // Handle toggling a cooking step as complete
  const toggleCookingStep = (stepId) => {
    const updatedSteps = cookingSteps.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );
    
    setCookingSteps(updatedSteps);
    
    // Save to plan state
    onUpdatePlan(plan.id, {
      cookingSteps: updatedSteps,
      productionStage: currentStage
    });
  };

  // Handle updating selling quantities
  const updateSellingData = (field, value) => {
    const updatedData = { ...sellingData, [field]: value };
    
    // Prevent exceeding total planned quantity
    const totalAllocated = updatedData.personalQuantity + updatedData.dealerQuantity;
    if (totalAllocated > plan.plannedQuantity) {
      if (field === 'personalQuantity') {
        updatedData.personalQuantity = plan.plannedQuantity - updatedData.dealerQuantity;
      } else if (field === 'dealerQuantity') {
        updatedData.dealerQuantity = plan.plannedQuantity - updatedData.personalQuantity;
      }
    }
    
    setSellingData(updatedData);
    
    // Save to plan state
    onUpdatePlan(plan.id, {
      sellingData: updatedData,
      productionStage: currentStage
    });
  };

  // Move to the next stage
  const advanceStage = () => {
    let nextStage;
    
    switch (currentStage) {
      case 'plan':
        nextStage = 'buy';
        break;
      case 'buy':
        nextStage = 'cook';
        break;
      case 'cook':
        nextStage = 'sell';
        break;
      case 'sell':
        // If already at sell, we're done - mark as sold
        handleCompleteSale();
        return;
      default:
        nextStage = 'plan';
    }
    
    setCurrentStage(nextStage);
    
    // Save stage to plan state
    onUpdatePlan(plan.id, {
      productionStage: nextStage
    });
  };

  // Handle completing the entire sale process
  const handleCompleteSale = () => {
    // Process personal sales
    if (sellingData.personalQuantity > 0) {
      const personalSale = {
        id: Date.now(),
        amount: sellingData.personalQuantity * sellingData.personalPrice,
        expenses: 0, // No additional expenses
        profit: sellingData.personalQuantity * sellingData.personalPrice - 
                (plan.productionCost * (sellingData.personalQuantity / plan.plannedQuantity)),
        type: 'personal',
        productType: plan.drugType,
        units: sellingData.personalQuantity,
        date: new Date().toISOString(),
        strainName: plan.strainName,
        strainId: plan.strainId
      };
      
      // Add to daily sales
      if (setDailySales) {
        setDailySales(prev => [...prev, personalSale]);
      }
    }
    
    // Process dealer sales
    if (sellingData.dealerQuantity > 0 && sellingData.selectedDealer) {
      const selectedDealer = dealers.find(d => d.id === parseInt(sellingData.selectedDealer));
      
      if (selectedDealer) {
        const dealerTransaction = {
          id: Date.now(),
          dealerId: selectedDealer.id,
          dealerName: selectedDealer.name,
          productType: plan.drugType,
          inventorySupplied: sellingData.dealerQuantity,
          cashCollected: sellingData.dealerQuantity * plan.salePrice,
          profit: sellingData.dealerQuantity * plan.salePrice * (1 - selectedDealer.cut / 100),
          date: new Date().toISOString(),
          strainName: plan.strainName,
          strainId: plan.strainId
        };
        
        // Add to dealer transactions
        if (setDealerTransactions) {
          setDealerTransactions(prev => [...prev, dealerTransaction]);
        }
      }
    }
    
    // Mark the production plan as sold
    onMarkAsSold(plan.id);
  };

  const toggleActionsMenu = (e) => {
    e.stopPropagation();
    setShowActionsMenu(!showActionsMenu);
  };

  const handleReproduce = () => {
    setShowQuantityModal(true);
  };

  const confirmReproduce = (quantity, quality) => {
    onReproduce(plan, quantity, quality);
    setShowQuantityModal(false);
  };

  // Render stage-specific content
  const renderStageContent = () => {
    if (plan.status === 'sold') {
      return (
        <div className="p-4 bg-green-50 border-t border-green-200">
          <div className="flex items-center text-green-700 mb-2">
            <Check className="w-5 h-5 mr-2" />
            <span className="font-medium">Production Completed and Sold</span>
          </div>
          <p className="text-sm text-green-600">
            This batch was successfully produced and sold on {formatDate(plan.dateSold)}.
          </p>
          <button
            onClick={handleReproduce}
            className="mt-3 w-full flex items-center justify-center py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-md font-medium"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Produce This Strain Again
          </button>
        </div>
      );
    }

    switch (currentStage) {
      case 'plan':
        return (
          <div className="p-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
              <ShoppingCart className="w-4 h-4 mr-1 text-blue-500" />
              Planning Stage
            </h3>
            
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-blue-700">
                Set your production quantity and adjust the sale price to see how profitability changes.
              </p>
            </div>
            
            {/* Quantity and Price Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Production Quantity
                </label>
                <div className="flex">
                  <input
                    type="number"
                    min="1"
                    value={plan.plannedQuantity}
                    onChange={(e) => {
                      const newQuantity = Math.max(1, parseInt(e.target.value) || 0);
                      // Recalculate expectedRevenue based on new quantity
                      const newExpectedRevenue = newQuantity * plan.salePrice;
                      onUpdatePlan(plan.id, { 
                        plannedQuantity: newQuantity,
                        expectedRevenue: newExpectedRevenue,
                        expectedProfit: newExpectedRevenue - plan.productionCost
                      });
                    }}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <span className="ml-2 p-2 bg-gray-100 rounded-md text-gray-700 whitespace-nowrap">
                    {drugTypes[plan.drugType]?.unit || 'units'}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per {drugTypes[plan.drugType]?.unit || 'unit'}
                </label>
                <div className="flex">
                  <span className="p-2 border border-r-0 rounded-l-md bg-gray-100 text-gray-700">$</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={plan.salePrice}
                    onChange={(e) => {
                      const newPrice = Math.max(0, parseInt(e.target.value) || 0);
                      // Recalculate expectedRevenue based on new price
                      const newExpectedRevenue = plan.plannedQuantity * newPrice;
                      onUpdatePlan(plan.id, { 
                        salePrice: newPrice,
                        expectedRevenue: newExpectedRevenue,
                        expectedProfit: newExpectedRevenue - plan.productionCost
                      });
                    }}
                    className="flex-1 p-2 border rounded-r-md"
                  />
                </div>
              </div>
            </div>
            
            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm font-medium text-gray-600">Total Cost</div>
                <div className="text-lg font-semibold">${plan.productionCost.toFixed(2)}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Cost per {drugTypes[plan.drugType]?.unit || 'unit'}: 
                  <span className="font-medium text-gray-700">
                    ${(plan.productionCost / plan.plannedQuantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm font-medium text-gray-600">Expected Revenue</div>
                <div className="text-lg font-semibold text-blue-600">${plan.expectedRevenue.toFixed(2)}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm font-medium text-gray-600">Expected Profit</div>
                <div className="text-lg font-semibold text-green-600">${plan.expectedProfit.toFixed(2)}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Profit per {drugTypes[plan.drugType]?.unit || 'unit'}: 
                  <span className="font-medium text-green-600">
                    ${(plan.expectedProfit / plan.plannedQuantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Profit Margin Display */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Profit margin:</span>
                <span className="font-medium text-green-600">
                  {Math.round((plan.expectedProfit / plan.expectedRevenue) * 100)}%
                </span>
              </div>
              <div className="mt-2 relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                  style={{ width: `${Math.min(100, Math.round((plan.expectedProfit / plan.expectedRevenue) * 100))}%` }}
                ></div>
              </div>
            </div>
            
            <button 
              onClick={advanceStage}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <ChevronsRight className="w-4 h-4 mr-1" />
              Proceed to Ingredients
            </button>
          </div>
        );
        
      case 'buy':
        return (
          <div className="p-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
              <ShoppingCart className="w-4 h-4 mr-1 text-orange-500" />
              Ingredients Shopping List
            </h3>
            
            <div className="bg-orange-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-orange-700">
                Check off each ingredient as you purchase them. When you have all ingredients, you can proceed to cooking.
              </p>
            </div>
            
            <div className="mb-4">
              {plan.totalIngredientNeeds.map((ingredient, idx) => (
                <div key={idx} className="flex items-center mb-2 p-2 bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    id={`ingredient-${idx}`}
                    checked={(purchasedIngredients[ingredient.name] || 0) >= ingredient.quantity}
                    onChange={(e) => toggleIngredientPurchased(ingredient.name, e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600"
                  />
                  <label htmlFor={`ingredient-${idx}`} className="flex-grow text-sm font-medium">
                    {ingredient.name}
                  </label>
                  
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="0"
                      max={ingredient.quantity}
                      value={purchasedIngredients[ingredient.name] || 0}
                      onChange={(e) => updatePurchasedQuantity(ingredient.name, e.target.value)}
                      className="w-16 p-1 text-sm border rounded mr-2 text-center"
                    />
                    <span className="text-sm text-gray-600">/ {ingredient.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={advanceStage}
              disabled={!allIngredientsPurchased()}
              className={`w-full py-2 rounded-md flex items-center justify-center ${
                allIngredientsPurchased()
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ChevronsRight className="w-4 h-4 mr-1" />
              {allIngredientsPurchased() ? 'Proceed to Cooking' : 'All Ingredients Required'}
            </button>
          </div>
        );
        
      case 'cook':
        return (
          <div className="p-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
              <Beaker className="w-4 h-4 mr-1 text-purple-500" />
              Cooking Recipe
            </h3>
            
            <div className="bg-purple-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-purple-700">
                Follow the mixing sequence exactly as shown. Check off each step as you complete it.
              </p>
            </div>
            
            <div className="mb-4">
              {cookingSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center mb-2 p-2 rounded ${
                    step.completed ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-medium mr-2">
                    {idx + 1}
                  </div>
                  
                  <label htmlFor={`step-${idx}`} className="flex-grow text-sm font-medium">
                    {step.name}
                  </label>
                  
                  <input
                    type="checkbox"
                    id={`step-${idx}`}
                    checked={step.completed}
                    onChange={() => toggleCookingStep(step.id)}
                    className="ml-auto h-5 w-5 text-purple-600"
                  />
                </div>
              ))}
            </div>
            
            <button 
              onClick={advanceStage}
              disabled={!allCookingStepsCompleted()}
              className={`w-full py-2 rounded-md flex items-center justify-center ${
                allCookingStepsCompleted()
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ChevronsRight className="w-4 h-4 mr-1" />
              {allCookingStepsCompleted() ? 'Product Ready for Sale' : 'Complete All Cooking Steps'}
            </button>
          </div>
        );
        
      case 'sell':
        return (
          <div className="p-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
              <DollarSign className="w-4 h-4 mr-1 text-green-500" />
              Product Distribution
            </h3>
            
            <div className="bg-green-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-green-700">
                Allocate your product between personal sales and dealer distribution. 
                Total allocated: {sellingData.personalQuantity + sellingData.dealerQuantity} of {plan.plannedQuantity}.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Personal Sales Section */}
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-gray-700 mb-2">Personal Sales</h4>
                
                <div className="mb-3">
                  <label className="block text-sm text-gray-600 mb-1">Quantity to Sell Personally</label>
                  <input
                    type="number"
                    min="0"
                    max={plan.plannedQuantity - sellingData.dealerQuantity}
                    value={sellingData.personalQuantity}
                    onChange={(e) => updateSellingData('personalQuantity', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm text-gray-600 mb-1">Price per {drugTypes[plan.drugType]?.unit || 'unit'}</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={sellingData.personalPrice}
                    onChange={(e) => updateSellingData('personalPrice', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div className="text-sm text-gray-700">
                  <div className="flex justify-between mb-1">
                    <span>Total Revenue:</span>
                    <span className="font-medium text-blue-600">
                      ${(sellingData.personalQuantity * sellingData.personalPrice).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Profit:</span>
                    <span className="font-medium text-green-600">
                      ${((sellingData.personalQuantity * sellingData.personalPrice) - 
                         (plan.productionCost * (sellingData.personalQuantity / plan.plannedQuantity))).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Dealer Assignment Section */}
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-gray-700 mb-2">Dealer Assignment</h4>
                
                {dealers && dealers.length > 0 ? (
                  <>
                    <div className="mb-3">
                      <label className="block text-sm text-gray-600 mb-1">Select Dealer</label>
                      <select
                        value={sellingData.selectedDealer}
                        onChange={(e) => updateSellingData('selectedDealer', e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select a dealer</option>
                        {dealers.filter(d => d.active).map(dealer => (
                          <option key={dealer.id} value={dealer.id}>
                            {dealer.name} - Cut: {dealer.cut}%
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm text-gray-600 mb-1">Quantity to Distribute</label>
                      <input
                        type="number"
                        min="0"
                        max={plan.plannedQuantity - sellingData.personalQuantity}
                        value={sellingData.dealerQuantity}
                        onChange={(e) => updateSellingData('dealerQuantity', Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    
                    {sellingData.selectedDealer && (
                      <div className="text-sm text-gray-700">
                        <div className="flex justify-between mb-1">
                          <span>Dealer Revenue:</span>
                          <span className="font-medium text-blue-600">
                            ${(sellingData.dealerQuantity * plan.salePrice).toFixed(2)}
                          </span>
                        </div>
                        
                        {(() => {
                          const selectedDealer = dealers.find(d => d.id === parseInt(sellingData.selectedDealer));
                          const dealerCut = selectedDealer ? selectedDealer.cut : 0;
                          const yourProfit = (sellingData.dealerQuantity * plan.salePrice) * (1 - dealerCut / 100);
                          
                          return (
                            <div className="flex justify-between">
                              <span>Your Profit (after {dealerCut}% cut):</span>
                              <span className="font-medium text-green-600">
                                ${yourProfit.toFixed(2)}
                              </span>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-yellow-50 p-3 rounded text-sm text-yellow-700">
                    <AlertTriangle className="inline-block mr-1 w-4 h-4" />
                    No active dealers available. Visit the Crew tab to activate dealers.
                  </div>
                )}
              </div>
            </div>
            
            <button 
              onClick={advanceStage}
              disabled={!allProductAllocated()}
              className={`w-full py-2 rounded-md flex items-center justify-center ${
                allProductAllocated()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <DollarSign className="w-4 h-4 mr-1" />
              {allProductAllocated() ? 'Complete Sale' : 'Allocate All Product'}
            </button>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Render stage badge
  const renderStageBadge = () => {
    if (plan.status === 'sold') {
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">
          Sold
        </span>
      );
    }
    
    switch (currentStage) {
      case 'plan':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 font-medium">
            Planning
          </span>
        );
      case 'buy':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800 font-medium">
            Ingredients
          </span>
        );
      case 'cook':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 font-medium">
            Cooking
          </span>
        );
      case 'sell':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">
            Selling
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 font-medium">
            In Progress
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <span className="text-xl">{getDrugTypeEmoji(plan.drugType)}</span>
          <div>
            <h3 className="font-medium text-gray-900">{plan.strainName}</h3>
            {plan.effects && plan.effects.length > 0 ? (
              <div className="flex flex-wrap gap-1 mt-1">
                {plan.effects.map((effect, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-white rounded-full text-xs"
                    style={{ backgroundColor: effectColors && effectColors[effect] ? effectColors[effect] : '#333' }}
                  >
                    {effect}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 mt-1">No effects data available</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Created: {formatDate(plan.dateCreated)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {renderStageBadge()}
          
          {/* More Actions Menu Toggle */}
          <div className="relative">
            <button
              onClick={toggleActionsMenu}
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
              title="More actions"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
            
            {/* Dropdown Menu */}
            {showActionsMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onToggleExpand();
                      setShowActionsMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Info className="inline h-4 w-4 mr-2" />
                    {isExpanded ? "Hide Details" : "View Details"}
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

      {/* Progress Bar */}
      <div className="bg-gray-100 h-2">
        <div 
          className={`h-full ${
            plan.status === 'sold' ? 'bg-green-500' :
            currentStage === 'plan' ? 'bg-blue-500' :
            currentStage === 'buy' ? 'bg-orange-500' :
            currentStage === 'cook' ? 'bg-purple-500' :
            'bg-green-500'
          }`}
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>

      {/* First-time User Tooltip (shown only when info icon is clicked) */}
      {showInfoTooltip && (
        <div className="p-2 bg-blue-50 border-b border-blue-200">
          <div className="flex items-start">
            <HelpCircle className="w-4 h-4 text-blue-500 mt-0.5 mr-2 shrink-0" />
            <div className="text-xs text-blue-700">
              <p className="mb-1"><strong>Production Flow:</strong> Follow these stages to complete production:</p>
              <ol className="list-decimal ml-4 space-y-1">
                <li><strong>Plan:</strong> Review production details</li>
                <li><strong>Buy Ingredients:</strong> Acquire all needed supplies</li>
                <li><strong>Cook:</strong> Follow the recipe sequence exactly</li>
                <li><strong>Sell:</strong> Distribute product personally or through dealers</li>
              </ol>
              <button 
                onClick={() => setShowInfoTooltip(false)}
                className="mt-1 text-blue-700 hover:text-blue-800 font-medium"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Production Stage Info Button */}
      {!showInfoTooltip && !plan.status === 'sold' && (
        <div className="px-4 py-1 bg-gray-50 border-b border-gray-200 flex justify-between text-xs text-gray-500">
          <span>
            {currentStage === 'plan' ? 'Planning Stage' : 
             currentStage === 'buy' ? 'Buying Ingredients' : 
             currentStage === 'cook' ? 'Cooking Process' : 
             'Distribution Stage'}
          </span>
          <button 
            onClick={() => setShowInfoTooltip(true)}
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <HelpCircle className="w-3 h-3 mr-1" />
            <span>How it works</span>
          </button>
        </div>
      )}

      {/* Quick Info Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Quantity</div>
            <div className="text-lg font-medium">{plan.plannedQuantity} {drugTypes[plan.drugType]?.unit || 'units'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Price</div>
            <div className="text-lg font-medium">${plan.salePrice} per {drugTypes[plan.drugType]?.unit || 'unit'}</div>
          </div>
        </div>
      </div>

      {/* Stage-specific Content */}
      {renderStageContent()}

      {/* Expanded Details */}
      {isExpanded && (
        <div className="p-4 bg-gray-50">
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
      <QuantityQualityModal
        isOpen={showQuantityModal}
        onClose={() => setShowQuantityModal(false)}
        onConfirm={confirmReproduce}
        initialQuantity={plan.plannedQuantity}
        drugType={plan.drugType}
      />
    </div>
  );
};

export default ProductionPlanCard;