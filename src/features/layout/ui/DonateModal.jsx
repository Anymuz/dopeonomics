// Component that renders a modal for users to donate to the project.
// Includes a button to close the modal, a message about supporting the project, and a link to donate.

// Importing icons for the modal
import { Heart, ExternalLink } from 'lucide-react';
import Modal from '../../../shared/ui/Modal.jsx';

const DonateModal = ({ onClose }) => { 
  return (
    <Modal onClose={onClose} className="shadow-xl">
      <Modal.Header hasCloseButton className="text-xl flex items-center">
        <Heart className="mr-2 w-5 h-5 text-pink-500" fill="currentColor" />
        Support Dopeonomics
      </Modal.Header>

      <p className="text-gray-600 mb-4">
        If you're enjoying Dopeonomics and would like to support its continued development, 
        consider making a small donation. Your support helps keep the servers running and 
        enables new features and improvements!
      </p>

      <div className="space-y-4">
        <a 
          href="https://buymeacoffee.com/fustahsonlabs" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md font-medium text-center flex items-center justify-center transition-colors"
        >
          ☕ Buy me a coffee <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>

      <div className="mt-6 text-sm text-gray-500 text-center">
        Thank you for your support! ❤️
      </div>
    </Modal>
  );
};

export default DonateModal;
