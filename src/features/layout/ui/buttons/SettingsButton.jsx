// Renders a button that opens the settings modal.
// Typically placed in the top right corner of the interface.

// Importing the Settings icon from lucide-react.
import { Settings } from 'lucide-react'; 

const SettingsButton = ({ onClick }) => {
  return (
    <button 
    onClick={onClick}
    className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
    title="Game Settings">
    <Settings className="w-5 h-5" />
  </button>
  );
};
export default SettingsButton;