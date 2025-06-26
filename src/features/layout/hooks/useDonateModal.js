import { useState } from 'react';

// Hook for donate button state
export const useDonateModal = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return { open, openModal, closeModal };
};
export default useDonateModal;