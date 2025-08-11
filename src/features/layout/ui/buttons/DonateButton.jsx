// Renders a button that allows users to donate to the project.
// Typically placed in the top left corner of the interface.

// Importing the icon and button component
import { Heart } from 'lucide-react'; 
import { IconButton } from '@shared/ui/Button';

const DonateButton = ({ onClick }) => {
  return (
    <IconButton
      icon={Heart}
      onClick={onClick}
      className="absolute top-0 left-0 flex items-center p-2 text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-md hover:from-pink-600 hover:to-purple-600"
      title="Support this project"
    >
      <span className="text-sm font-medium ml-1">Donate</span>
    </IconButton>
  );
};
export default DonateButton;
