// AutoSave.js
// Component that provides automatic saving of game state
import React, { useEffect, useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import StorageService from './StorageService';

const AUTO_SAVE_INTERVAL = 30000; // Auto-save every 30 seconds

const AutoSave = ({ 
  gameState, 
  onManualSave,
  autoSaveInterval = AUTO_SAVE_INTERVAL 
}) => {
  const [lastSaved, setLastSaved] = useState(null);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  // Function to handle saving
  const saveGame = () => {
    // Call the manual save function passed from parent
    onManualSave();
    
    // Update last saved timestamp
    const now = new Date();
    setLastSaved(now);
    
    // Show confirmation message briefly
    setShowSaveConfirmation(true);
    setTimeout(() => {
      setShowSaveConfirmation(false);
    }, 2000);
  };

  // Set up auto-save interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      saveGame();
    }, autoSaveInterval);

    // Save on component mount
    saveGame();

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [autoSaveInterval, gameState]);

  // Save when window is about to unload (close/refresh)
  useEffect(() => {
    const handleBeforeUnload = () => {
      onManualSave();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [gameState]);

  // Format the last saved time
  const formatLastSaved = (date) => {
    if (!date) return 'Never';
    
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showSaveConfirmation && (
        <div className="animate-fade-in-out bg-green-100 text-green-800 px-3 py-2 rounded-lg mb-2 flex items-center shadow-md">
          <CheckCircle className="w-4 h-4 mr-2" />
          Game saved!
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500 mr-3">
            Last saved: {formatLastSaved(lastSaved)}
          </div>
          
          <button
            onClick={saveGame}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center"
            title="Save game"
          >
            <Save className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoSave;