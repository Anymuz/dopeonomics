// Component to render the settings modal for game settings, save data, import/export functionality, and reset options.
const SettingsModal = (confirm, error, onClose, onExport, onImport, onReset) => {
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
              onClick={onExport}
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
                onChange={onImport}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </label>
            
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          {/* Reset Game Section */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Reset Game</h3>
            <p className="text-sm text-gray-500 mb-3">
              This will delete all your saved data and start fresh. This cannot be undone!
            </p>
            
            <button
              onClick={onReset}
              className={`${
                confirm 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              } py-2 px-4 rounded flex items-center w-full justify-center`}
            >
              {confirm ? (
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
            
            {confirm && (
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