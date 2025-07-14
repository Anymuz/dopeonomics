// Hook to manage the state of the naming modal in the strain creator feature.
// Provides functionality to open and close the modal to name the pending mix state.

// Import necessary libraries from React.
import { useState } from 'react';

const useNamingModal = () =>{
  // State variables to manage the naming modal state and the pending mix:
  // isNamingModalOpen: Boolean to track if the naming modal is open via UI components.
  const [isNamingModalOpen, setIsNamingModalOpen] = useState(false);
  const [pendingMix, setPendingMix] = useState(null);
  const [name, setName] = useState(''); // State  to hold the name of the mix.

  // Return the modal state and setters to allow components to access and modify the modal state:
  return {
    isNamingModalOpen, setIsNamingModalOpen,
    name, setName,
    pendingMix, setPendingMix,
  };
}
export default useNamingModal;