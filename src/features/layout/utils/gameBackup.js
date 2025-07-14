// Helper for export, import and reset of the application states.
// This assumes every Zustand slice will be created with 'persist' and a distinct name.

// Import the slice keys used in the application.
// These keys are used to identify different slices of state in localStorage.
import sliceKeys from "@features/layout/data/sliceKeys";

// Export function to collect all game data from localStorage:
// Returns it in a structured format for download.
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

// Download function to save the game data as a JSON file:
// Creates a Blob from the game data and triggers a download.
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

// Import function to read a JSON file and update persistent storage with the data:
// Expects the JSON to have a specific structure with a version and slices.
export const handleImportData = (json) => {
  if (!json.version || !json.slices) {
    console.error('Error importing game data: Invalid Save File');
    throw new Error('Invalid save file. Please try another file.');
  };
  Object.entries(json.slices).forEach(([key, value]) => {
    if (value !== null) localStorage.setItem(key, JSON.stringify(value));
  });
};

// Reset function to clear all game data from localStorage:
// This will remove all slices defined in sliceKeys.
export const handleResetGame = () => {
  sliceKeys.forEach((key) => localStorage.removeItem(key));
};