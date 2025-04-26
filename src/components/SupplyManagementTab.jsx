// SupplyManagementTab.js
import React, { useState} from 'react';
import {
  Package,
  ShoppingBag,
  AlertTriangle,
  Search,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

// Supply Management Tab Component
const SupplyManagementTab = ({
  supplies = {
    seeds: {},
    ingredients: {},
    packaging: { baggies: 0, jars: 0 }
  }, // Add default value
  setSupplies,
  supplyHistory = [], // Add default value
  setSupplyHistory,
  productionPlans = [], // Add default value
  drugTypes,
  seedTypes,
  ingredients
}) => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [showLowStock, setShowLowStock] = useState(false);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [purchaseForm, setPurchaseForm] = useState({
    itemType: 'seed',
    itemId: '',
    quantity: 1,
    cost: 0
  });

  // Helper function to get required supplies for all production plans
  const calculateRequiredSupplies = () => {
    const requiredSupplies = {
      seeds: {},
      ingredients: {},
      packaging: { baggies: 0, jars: 0 }
    };
    
    productionPlans.forEach(plan => {
      // Skip sold plans
      if (plan.status === 'sold') return;
      
      // Add seed requirements
      plan.totalIngredientNeeds.forEach(item => {
        if (item.name.includes('Seed') || item.name.includes('Leaves') || item.name.includes('Pseudo')) {
          // This is a seed item
          requiredSupplies.seeds[item.name] = (requiredSupplies.seeds[item.name] || 0) + item.quantity;
        } else {
          // This is an ingredient
          requiredSupplies.ingredients[item.name] = (requiredSupplies.ingredients[item.name] || 0) + item.quantity;
        }
      });
      
      // Add packaging requirements
      if (plan.packagingNeeded.type === 'baggies') {
        requiredSupplies.packaging.baggies += plan.packagingNeeded.quantity;
      } else {
        requiredSupplies.packaging.jars += plan.packagingNeeded.quantity;
      }
    });
    
    return requiredSupplies;
  };

  // Calculate which supplies are low or missing
  const calculateSupplyStatus = () => {
    const required = calculateRequiredSupplies();
    const status = {
      seeds: {},
      ingredients: {},
      packaging: { baggies: 0, jars: 0 }
    };
    
    // Check seeds
    for (const [name, requiredQty] of Object.entries(required.seeds)) {
      const inStock = supplies.seeds[name] || 0;
      status.seeds[name] = {
        required: requiredQty,
        inStock,
        shortage: Math.max(0, requiredQty - inStock)
      };
    }
    
    // Check ingredients
    for (const [name, requiredQty] of Object.entries(required.ingredients)) {
      const inStock = supplies.ingredients[name] || 0;
      status.ingredients[name] = {
        required: requiredQty,
        inStock,
        shortage: Math.max(0, requiredQty - inStock)
      };
    }
    
    // Check packaging
    status.packaging.baggies = {
      required: required.packaging.baggies,
      inStock: supplies.packaging.baggies,
      shortage: Math.max(0, required.packaging.baggies - supplies.packaging.baggies)
    };
    
    status.packaging.jars = {
      required: required.packaging.jars,
      inStock: supplies.packaging.jars,
      shortage: Math.max(0, required.packaging.jars - supplies.packaging.jars)
    };
    
    return status;
  };

  // Handle form changes
  const handlePurchaseFormChange = (e) => {
    const { name, value } = e.target;
    
    // Auto-calculate cost if seed or ingredient is selected
    if (name === 'itemId' && purchaseForm.itemType !== 'packaging') {
      let costPerUnit = 0;
      if (purchaseForm.itemType === 'seed') {
        const seed = seedTypes.find(seed => seed.name === value);
        costPerUnit = seed ? seed.cost : 0;
      } else {
        const ingredient = ingredients.find(ing => ing.name === value);
        costPerUnit = ingredient ? ingredient.cost : 0;
      }
      
      setPurchaseForm({
        ...purchaseForm,
        [name]: value,
        cost: costPerUnit * purchaseForm.quantity
      });
    } else if (name === 'quantity') {
      // Recalculate cost when quantity changes
      let costPerUnit = 0;
      if (purchaseForm.itemType === 'seed' && purchaseForm.itemId) {
        const seed = seedTypes.find(seed => seed.name === purchaseForm.itemId);
        costPerUnit = seed ? seed.cost : 0;
      } else if (purchaseForm.itemType === 'ingredient' && purchaseForm.itemId) {
        const ingredient = ingredients.find(ing => ing.name === purchaseForm.itemId);
        costPerUnit = ingredient ? ingredient.cost : 0;
      } else if (purchaseForm.itemType === 'packaging') {
        costPerUnit = purchaseForm.itemId === 'baggies' ? 1 : 3;
      }
      
      setPurchaseForm({
        ...purchaseForm,
        [name]: parseInt(value) || 1,
        cost: costPerUnit * (parseInt(value) || 1)
      });
    } else if (name === 'itemType') {
      // Reset itemId when type changes
      setPurchaseForm({
        ...purchaseForm,
        [name]: value,
        itemId: '',
        cost: 0
      });
    } else {
      setPurchaseForm({
        ...purchaseForm,
        [name]: value
      });
    }
  };

  // Handle purchase form submission
  const handlePurchase = (e) => {
    e.preventDefault();
    
    if (!purchaseForm.itemId || purchaseForm.quantity <= 0) return;
    
    // Create transaction record
    const transaction = {
      id: Date.now(),
      itemType: purchaseForm.itemType,
      itemName: purchaseForm.itemId,
      quantity: purchaseForm.quantity,
      cost: purchaseForm.cost,
      date: new Date().toISOString()
    };
    
    // Update supply history
    setSupplyHistory([...supplyHistory, transaction]);
    
    // Update supplies
    const newSupplies = { ...supplies };
    
    if (purchaseForm.itemType === 'seed') {
      newSupplies.seeds[purchaseForm.itemId] = (newSupplies.seeds[purchaseForm.itemId] || 0) + purchaseForm.quantity;
    } else if (purchaseForm.itemType === 'ingredient') {
      newSupplies.ingredients[purchaseForm.itemId] = (newSupplies.ingredients[purchaseForm.itemId] || 0) + purchaseForm.quantity;
    } else if (purchaseForm.itemType === 'packaging') {
      newSupplies.packaging[purchaseForm.itemId] += purchaseForm.quantity;
    }
    
    setSupplies(newSupplies);
    
    // Reset form
    setPurchaseForm({
      itemType: 'seed',
      itemId: '',
      quantity: 1,
      cost: 0
    });
  };

  // Handle sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Filter and sort inventory items
  const getFilteredAndSortedInventory = () => {
    const allItems = [];
    
    // Convert seeds to array
    Object.entries(supplies.seeds).forEach(([name, quantity]) => {
      if (quantity > 0) {
        const seed = seedTypes.find(s => s.name === name);
        allItems.push({
          id: name,
          name,
          type: 'seed',
          category: seed ? seed.drugType : 'unknown',
          quantity,
          cost: seed ? seed.cost : 0,
          isLowStock: false
        });
      }
    });
    
    // Convert ingredients to array
    Object.entries(supplies.ingredients).forEach(([name, quantity]) => {
      if (quantity > 0) {
        const ingredient = ingredients.find(i => i.name === name);
        allItems.push({
          id: name,
          name,
          type: 'ingredient',
          category: 'ingredient',
          quantity,
          cost: ingredient ? ingredient.cost : 0,
          isLowStock: false
        });
      }
    });
    
    // Add packaging
    if (supplies.packaging.baggies > 0) {
      allItems.push({
        id: 'baggies',
        name: 'Baggies',
        type: 'packaging',
        category: 'packaging',
        quantity: supplies.packaging.baggies,
        cost: 1,
        isLowStock: false
      });
    }
    
    if (supplies.packaging.jars > 0) {
      allItems.push({
        id: 'jars',
        name: 'Jars',
        type: 'packaging',
        category: 'packaging',
        quantity: supplies.packaging.jars,
        cost: 3,
        isLowStock: false
      });
    }
    
    // Mark low stock items based on production requirements
    const supplyStatus = calculateSupplyStatus();
    
    allItems.forEach(item => {
      if (item.type === 'seed') {
        const seedStatus = supplyStatus.seeds[item.name];
        if (seedStatus && seedStatus.shortage > 0) {
          item.isLowStock = true;
          item.required = seedStatus.required;
          item.shortage = seedStatus.shortage;
        }
      } else if (item.type === 'ingredient') {
        const ingredientStatus = supplyStatus.ingredients[item.name];
        if (ingredientStatus && ingredientStatus.shortage > 0) {
          item.isLowStock = true;
          item.required = ingredientStatus.required;
          item.shortage = ingredientStatus.shortage;
        }
      } else if (item.type === 'packaging') {
        const packagingStatus = supplyStatus.packaging[item.id];
        if (packagingStatus && packagingStatus.shortage > 0) {
          item.isLowStock = true;
          item.required = packagingStatus.required;
          item.shortage = packagingStatus.shortage;
        }
      }
    });
    
    // Filter by search term
    let filteredItems = allItems;
    if (searchTerm) {
      filteredItems = allItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by low stock
    if (showLowStock) {
      filteredItems = filteredItems.filter(item => item.isLowStock);
    }
    
    // Sort items
    filteredItems.sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    return filteredItems;
  };

  // Render the sort icon
  const renderSortIcon = (column) => {
    if (sortColumn !== column) return null;
    
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-4 h-4 ml-1 inline-block text-blue-500" />
      : <ArrowDown className="w-4 h-4 ml-1 inline-block text-blue-500" />;
  };
  
  // Get list of required supplies for rendering
  const getRequiredSuppliesList = () => {
    const status = calculateSupplyStatus();
    const requiredItems = [];
    
    // Add seeds with shortages
    for (const [name, data] of Object.entries(status.seeds)) {
      if (data.shortage > 0) {
        const seed = seedTypes.find(s => s.name === name);
        requiredItems.push({
          id: name,
          name,
          type: 'seed',
          category: seed ? seed.drugType : 'unknown',
          required: data.required,
          inStock: data.inStock,
          shortage: data.shortage,
          cost: seed ? seed.cost : 0,
          totalCost: (seed ? seed.cost : 0) * data.shortage
        });
      }
    }
    
    // Add ingredients with shortages
    for (const [name, data] of Object.entries(status.ingredients)) {
      if (data.shortage > 0) {
        const ingredient = ingredients.find(i => i.name === name);
        requiredItems.push({
          id: name,
          name,
          type: 'ingredient',
          category: 'ingredient',
          required: data.required,
          inStock: data.inStock,
          shortage: data.shortage,
          cost: ingredient ? ingredient.cost : 0,
          totalCost: (ingredient ? ingredient.cost : 0) * data.shortage
        });
      }
    }
    
    // Add packaging with shortages
    if (status.packaging.baggies.shortage > 0) {
      requiredItems.push({
        id: 'baggies',
        name: 'Baggies',
        type: 'packaging',
        category: 'packaging',
        required: status.packaging.baggies.required,
        inStock: status.packaging.baggies.inStock,
        shortage: status.packaging.baggies.shortage,
        cost: 1,
        totalCost: 1 * status.packaging.baggies.shortage
      });
    }
    
    if (status.packaging.jars.shortage > 0) {
      requiredItems.push({
        id: 'jars',
        name: 'Jars',
        type: 'packaging',
        category: 'packaging',
        required: status.packaging.jars.required,
        inStock: status.packaging.jars.inStock,
        shortage: status.packaging.jars.shortage,
        cost: 3,
        totalCost: 3 * status.packaging.jars.shortage
      });
    }
    
    return requiredItems;
  };

  // Calculate total cost for required supplies
  const calculateTotalRequiredCost = () => {
    return getRequiredSuppliesList().reduce((total, item) => total + item.totalCost, 0);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <Package className="mr-2 w-6 h-6 text-orange-500" />
        Supply Management
      </h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'inventory'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'purchase'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('purchase')}
        >
          Purchase Supplies
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'required'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('required')}
        >
          Required Supplies
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'history'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('history')}
        >
          Purchase History
        </button>
      </div>

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-9 text-sm border rounded-md"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center ml-4">
              <input
                type="checkbox"
                id="show-low-stock"
                checked={showLowStock}
                onChange={() => setShowLowStock(!showLowStock)}
                className="mr-2"
              />
              <label htmlFor="show-low-stock" className="text-sm text-gray-600">Show low stock only</label>
              </div>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('name')}>
                    Name {renderSortIcon('name')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('type')}>
                    Type {renderSortIcon('type')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('quantity')}>
                    Quantity {renderSortIcon('quantity')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('cost')}>
                    Cost/Unit {renderSortIcon('cost')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getFilteredAndSortedInventory().map(item => (
                  <tr key={`${item.type}-${item.id}`} className={`hover:bg-gray-50 ${item.isLowStock ? 'bg-red-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${item.cost}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.isLowStock ? (
                        <div className="text-red-600 text-sm">
                          <AlertTriangle className="inline-block mr-1 w-4 h-4" />
                          Low Stock - Need {item.shortage} more
                        </div>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          In Stock
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                
                {getFilteredAndSortedInventory().length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Purchase Supplies Tab */}
      {activeTab === 'purchase' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Purchase Supplies</h3>
            <form onSubmit={handlePurchase} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Type
                  </label>
                  <select
                    name="itemType"
                    value={purchaseForm.itemType}
                    onChange={handlePurchaseFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="seed">Seeds</option>
                    <option value="ingredient">Ingredients</option>
                    <option value="packaging">Packaging</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item
                  </label>
                  <select
                    name="itemId"
                    value={purchaseForm.itemId}
                    onChange={handlePurchaseFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select an item</option>
                    
                    {purchaseForm.itemType === 'seed' && seedTypes.map(seed => (
                      <option key={seed.name} value={seed.name}>
                        {seed.name} (${seed.cost})
                      </option>
                    ))}
                    
                    {purchaseForm.itemType === 'ingredient' && ingredients.map(ingredient => (
                      <option key={ingredient.name} value={ingredient.name}>
                        {ingredient.name} (${ingredient.cost})
                      </option>
                    ))}
                    
                    {purchaseForm.itemType === 'packaging' && (
                      <>
                        <option value="baggies">Baggies ($1 each)</option>
                        <option value="jars">Jars ($3 each)</option>
                      </>
                    )}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={purchaseForm.quantity}
                    onChange={handlePurchaseFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Cost
                  </label>
                  <div className="w-full p-2 border rounded-md bg-gray-50">
                    ${purchaseForm.cost}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  disabled={!purchaseForm.itemId || purchaseForm.quantity <= 0}
                >
                  <ShoppingBag className="w-4 h-4 mr-1 inline-block" />
                  Purchase Supplies
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Required Supplies Tab */}
      {activeTab === 'required' && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Supply Requirements</h3>
            <p className="text-sm text-gray-500 mb-4">
              Based on your active production plans, you need the following supplies:
            </p>
            
            <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Required
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      In Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shortage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getRequiredSuppliesList().map(item => (
                    <tr key={`${item.type}-${item.id}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.required}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.inStock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                        {item.shortage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        ${item.totalCost}
                      </td>
                    </tr>
                  ))}
                  
                  {getRequiredSuppliesList().length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        No supply shortages
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {getRequiredSuppliesList().length > 0 && (
              <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-800">Total Cost for Missing Supplies</h4>
                  <span className="text-xl font-bold text-blue-600">${calculateTotalRequiredCost()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Purchase History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {supplyHistory.map(transaction => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.itemName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {transaction.itemType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                      ${transaction.cost}
                    </td>
                  </tr>
                ))}
                
                {supplyHistory.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No purchase history
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplyManagementTab;