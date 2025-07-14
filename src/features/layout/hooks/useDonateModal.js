// Hook for managing the state of the donate modal.
// Provides functionality to open and close the modal.

// Import necessary libraries from React.
import { useState } from 'react';

const useDonateModal = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return { open, openModal, closeModal };
};
export default useDonateModal;