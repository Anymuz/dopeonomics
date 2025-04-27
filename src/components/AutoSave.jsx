import useGameStore from '../stores/GameStore.jsx';
// AutoSave.js
// Component that provides automatic saving of game state without UI elements
import { useEffect, useCallback } from 'react';

const AUTO_SAVE_INTERVAL = 30000; // Auto-save every 30 seconds

const AutoSave = ({ 
  gameState, 
  onManualSave,
  autoSaveInterval = AUTO_SAVE_INTERVAL 
}) => {
  // Function to handle automatic saving (silent)
  const autoSaveGame = useCallback(() => {
    // Call the manual save function passed from parent
    onManualSave();
  }, [onManualSave]);

  // Set up auto-save interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      autoSaveGame();
    }, autoSaveInterval);

    // Save on component mount (silent)
    autoSaveGame();

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [autoSaveInterval, autoSaveGame, gameState]);

  // Save when window is about to unload (close/refresh)
  useEffect(() => {
    const handleBeforeUnload = () => {
      onManualSave();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [onManualSave, gameState]);

  // Return null since we don't need UI elements anymore
  return null;
};

export default AutoSave;