// SettingsModal.js
import React, { useState } from 'react';
import { Settings, X, Save, Trash2, AlertTriangle, Download, Upload } from 'lucide-react';
import StorageService from './StorageService';

const SettingsModal = ({ isOpen, onClose }) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [exportDataUrl, setExportDataUrl] = useState(null);
  const [importError, setImportError] = useState(null);

  // Close modal if not open
  if (!isOpen) return null;

  // Handle export game data
  const handleExportData = () => {
    try {
      // Collect all game data
      const gameData = {
        mixes: StorageService.loadMixes(),
        productionPlans: StorageService.loadProductionPlans(),
        salesHistory: StorageService.loadSalesHistory(),
        activeTab: StorageService.loadActiveTab(),
        strainView: StorageService.loadStrainView(),
        filterOptions: StorageService.loadFilterOptions(),
        sortSettings: StorageService.loadSortSettings(),
        currentMix: StorageService.loadCurrentMix(),
        selectedDrugType: StorageService.loadSelectedDrugType(),
        selectedSeed: StorageService.loadSelectedSeed(),
        priceSettings: StorageService.loadPriceSettings(),
        exportDate: new Date().toISOString(),
        version: '1.0.0' // Add version for future compatibility
      };

      // Create a Blob with the data
      const blob = new Blob([JSON.stringify(gameData, null, 2)], { type: 'application/json' });
      
      // Create a downloadable URL
      const url = URL.createObjectURL(blob);
      setExportDataUrl(url);
      
      // Create element to trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `dopeonomics-save-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Error exporting game data:', error);
    }
  };

  // Handle import game data
  const handleImportData = (event) => {
    const file = event.target.files[0];
    setImportError(null);
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          
          // Validate data structure
          if (!importedData.version || !importedData.mixes) {
            throw new Error('Invalid save file format');
          }
          
          // Import each data category
          if (importedData.mixes) StorageService.saveMixes(importedData.mixes);
          if (importedData.productionPlans) StorageService.saveProductionPlans(importedData.productionPlans);
          if (importedData.salesHistory) StorageService.saveSalesHistory(importedData.salesHistory);
          if (importedData.activeTab) StorageService.saveActiveTab(importedData.activeTab);
          if (importedData.strainView) StorageService.saveStrainView(importedData.strainView);
          if (importedData.filterOptions) StorageService.saveFilterOptions(importedData.filterOptions);
          if (importedData.sortSettings) StorageService.saveSortSettings(importedData.sortSettings);
          if (importedData.currentMix) StorageService.saveCurrentMix(importedData.currentMix);
          if (importedData.selectedDrugType) StorageService.saveSelectedDrugType(importedData.selectedDrugType);
          if (importedData.selectedSeed) StorageService.saveSelectedSeed(importedData.selectedSeed);
          if (importedData.priceSettings) StorageService.savePriceSettings(importedData.priceSettings);
          
          // Refresh page to load imported data
          window.location.reload();
        } catch (error) {
          console.error('Error importing game data:', error);
          setImportError('Invalid save file. Please try another file.');
        }
      };
      
      reader.readAsText(file);
    }
  };

  // Handle reset game
  const handleResetGame = () => {
    if (showConfirmReset) {
      // Actually reset the game
      StorageService.clearAllData();
      window.location.reload();
    } else {
      // Show confirmation
      setShowConfirmReset(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Settings className="mr-2 w-5 h-5" />
            Game Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Save Data Section */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-md font-medium text-gray-700 mb-2">Save Data</h3>
            <p className="text-sm text-gray-500 mb-3">
              Your game automatically saves when you make changes and when you close the game.
            </p>
            <button
              onClick={handleExportData}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center w-full justify-center"
            >
              <Download className="mr-2 w-4 h-4" />
              Export Save File
            </button>
          </div>

          {/* Import Data Section */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-md font-medium text-gray-700 mb-2">Import Data</h3>
            <p className="text-sm text-gray-500 mb-3">
              Import a previously exported save file. This will overwrite your current game data.
            </p>
            
            <label className="block">
              <span className="sr-only">Choose save file</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </label>
            
            {importError && (
              <p className="mt-2 text-sm text-red-600">{importError}</p>
            )}
          </div>

          {/* Reset Game Section */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Reset Game</h3>
            <p className="text-sm text-gray-500 mb-3">
              This will delete all your saved data and start fresh. This cannot be undone!
            </p>
            
            <button
              onClick={handleResetGame}
              className={`${
                showConfirmReset 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              } py-2 px-4 rounded flex items-center w-full justify-center`}
            >
              {showConfirmReset ? (
                <>
                  <AlertTriangle className="mr-2 w-4 h-4" />
                  Yes, Reset Everything
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 w-4 h-4" />
                  Reset Game Data
                </>
              )}
            </button>
            
            {showConfirmReset && (
              <p className="mt-2 text-sm text-red-600 flex items-start">
                <AlertTriangle className="w-4 h-4 mr-1 shrink-0 mt-0.5" />
                <span>Are you sure? This will permanently delete all your strains, production plans, and settings.</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;