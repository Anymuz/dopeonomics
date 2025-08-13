// Hook for managing the naming modal state in the strain creator.
// Provides functionality to open and close the modal for naming completed strain mixes.
// Handles the pending mix data and name input state during the naming process.

// Importing React hooks for state management.
import { useState } from 'react';

const useNamingModal = () =>{
  // State variables to manage the naming modal state and the pending mix:
  const [isNamingModalOpen, setIsNamingModalOpen] = useState(false);
  const [pendingMix, setPendingMix] = useState(null);
  const [name, setName] = useState('');

  // Handler to open the modal with a pending mix
  const openNamingModal = (mixData) => {
    setPendingMix(mixData);
    setIsNamingModalOpen(true);
    setName('');
  };

  // Handler to close the modal and clear all state
  const closeNamingModal = () => {
    setIsNamingModalOpen(false);
    setPendingMix(null);
    setName('');
  };

  // Handler for confirming name and closing modal
  const handleConfirm = (onConfirm) => {
    if (name.trim()) {
      onConfirm(name.trim());
      closeNamingModal(); 
    }
  };

  // Handler for keyboard events
  const handleKeyPress = (e, onConfirm) => {
    if (e.key === 'Enter' && name.trim()) {
      handleConfirm(onConfirm);
    }
  };

  // Return the essential state and handlers:
  return {
    isNamingModalOpen,
    name,
    setName, 
    pendingMix,
    openNamingModal,
    closeNamingModal,
    handleConfirm,
    handleKeyPress,
  };
}
export default useNamingModal;