/**
 * Helper for export / import / reset game state.
 * This assumes every Zustand slice will be created with 'persist' and a distinct name.
*/
import sliceKeys from "@features/layout/data/sliceKeys";

// Helper function to export persitent state
export const exportGameState = () => {
  // Collect all game data
  const gameData = Object.fromEntries(
    sliceKeys.map((key) => [key, JSON.parse(localStorage.getItem(key) || 'null')])
  );
  return {
    version: '1.0.0', // Add version for future compatibility
    date: new Date().toISOString(), // Include date of export - Anymuz
    slices: gameData,
  };
};

// Helper fuction to download users JSON file
export const downloadJSON = (object, filename) => {
  try {
    // Create a Blob with the data
    const blob = new Blob([JSON.stringify(object, null, 2)], { type: 'application/json' });

    // Create a downloadable URL and trigger download
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('anchor'); // Make <a> anchor element
    anchor.href = url;
    anchor.download = filename || `dopeonomics-save-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(anchor);
    anchor.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Error exporting game data:', error);
  };
};

// Import data from JSON file
export const handleImportData = (json) => {
  if (!json.version || !json.slices) {
    console.error('Error importing game data: Invalid Save File');
    throw new Error('Invalid save file. Please try another file.');
  };
  Object.entries(json.slices).forEach(([key, value]) => {
    if (value !== null) localStorage.setItem(key, JSON.stringify(value));
  });
};

// Reset game to new
export const handleResetGame = () => {
  sliceKeys.forEach((key) => localStorage.removeItem(key));
};