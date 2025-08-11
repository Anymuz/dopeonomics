// Component to render the settings modal for game settings, save data, import/export functionality, and reset options.
import { Settings, Download, AlertTriangle, Trash2 } from 'lucide-react';
import Modal from '../../../shared/ui/Modal.jsx';
import { PrimaryButton, SecondaryButton, GrayButton } from '../../../shared/ui/Button.jsx';
import { InputField } from '../../../shared/ui/Input.jsx';
import Alert from '../../../shared/ui/Alert.jsx';

const SettingsModal = ({ confirm, error, onClose, onExport, onImport, onReset }) => {
  return ( 
    <Modal onClose={onClose} className="shadow-xl">
      <Modal.Header hasCloseButton className="text-xl flex items-center">
        <Settings className="mr-2 w-5 h-5" />
        Game Settings
      </Modal.Header>

        <div className="space-y-6">
          {/* Save Data Section */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-md font-medium text-gray-700 mb-2">Save Data</h3>
            <p className="text-sm text-gray-500 mb-3">
              Your game automatically saves when you make changes and when you close the game.
            </p>
            <PrimaryButton
              onClick={onExport}
              className="w-full flex items-center justify-center"
            >
              <Download className="mr-2 w-4 h-4" />
              Export Save File
            </PrimaryButton>
          </div>

          {/* Import Data Section */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-md font-medium text-gray-700 mb-2">Import Data</h3>
            <p className="text-sm text-gray-500 mb-3">
              Import a previously exported save file. This will overwrite your current game data.
            </p>
            
            <InputField
              label="Choose save file"
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
            
            {error && (
              <Alert type="error" className="mt-2">
                {error}
              </Alert>
            )}
          </div>

          {/* Reset Game Section */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Reset Game</h3>
            <p className="text-sm text-gray-500 mb-3">
              This will delete all your saved data and start fresh. This cannot be undone!
            </p>
            
            {confirm ? (
              <PrimaryButton
                onClick={onReset}
                className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center"
              >
                <AlertTriangle className="mr-2 w-4 h-4" />
                Yes, Reset Everything
              </PrimaryButton>
            ) : (
              <GrayButton
                onClick={onReset}
                className="w-full flex items-center justify-center"
              >
                <Trash2 className="mr-2 w-4 h-4" />
                Reset Game Data
              </GrayButton>
            )}
            
            {confirm && (
              <Alert 
                type="error" 
                icon={AlertTriangle}
                className="mt-2"
              >
                Are you sure? This will permanently delete all your strains, production plans, and settings.
              </Alert>
            )}
          </div>
        </div>
    </Modal>
  );
};

export default SettingsModal;