// Renders a button that opens the settings modal.
// Typically placed in the top right corner of the interface.

// Importing the Settings icon and icon button from lucide-react and shared.
import { Settings } from 'lucide-react';
import { IconButton } from '@shared/ui/Button';


const SettingsButton = ({ onClick }) => {
  return (
    <IconButton
      icon ={Settings}
      onClick={onClick}
      className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
      title="Game Settings">
    </IconButton>
  );
};
export default SettingsButton;