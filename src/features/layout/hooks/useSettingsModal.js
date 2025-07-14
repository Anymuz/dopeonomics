// Hook for managing settings modal state and actions
// Provides functionality for exporting, importing, and resetting game data, as well as managing modal visibility and error states.

// Import necessary libraries and utilities.
import { useState } from 'react';
import { exportGameState, downloadJSON, handleImportData, handleResetGame } from '@features/layout/utils/gameBackup';

const useSettingsModal = () => {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [err, setErr] = useState(null);

  const openModal = () => setOpen(true);
  const closeModal =  () => setOpen(false);

  const exportData = () => {
    const data = exportGameState();
    downloadJSON(data, `dopeonomics-${data.date.slice(0,10)}.json`);
  };

  const importData = (file) => {
  setErr(null);
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      handleImportData(JSON.parse(event.target.result));
      window.location.reload();
    } catch {
      setErr('Invalid save file.');
    }
  };
  reader.readAsText(file);
};

  const reset = () => {
    if (!confirm) return setConfirm(true);
    handleResetGame();
    window.location.reload();
  };

  return { 
    open, confirm, err,
    closeModal,  exportData, importData,  openModal, reset, setErr, setConfirm 
  };
};
export default useSettingsModal;
