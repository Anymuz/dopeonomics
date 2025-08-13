// NamePromptModal - Modal component for naming completed strain creations.
// Provides input interface for strain naming with confirm/cancel functionality.

// Importing shared UI components for modal and form elements.
import Modal from '@shared/ui/Modal';
import { InputField } from '@shared/ui/Input';
import { PrimaryButton, SecondaryButton } from '@shared/ui/Button';

// Importing hook for modal state management.
import useNamingModal from '@features/strain-creator/hooks/useNamingModal';

const NamePromptModal = ({ onConfirm }) => {
  const {
    name,
    setName, // Direct setter instead of handleNameChange
    closeNamingModal, // Single close function instead of handleClose
    handleConfirm,
    handleKeyPress,
  } = useNamingModal();

  return (
    <Modal onClose={closeNamingModal}>
      <Modal.Header hasCloseButton>Name Your Creation</Modal.Header>
      
      <p className="text-sm text-gray-600 mb-4">
        Give your strain creation a memorable name:
      </p>
      
      <InputField
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => handleKeyPress(e, onConfirm)}
        placeholder="Enter a name..."
        autoFocus
      />
      
      <Modal.Buttons>
        <SecondaryButton onClick={closeNamingModal}>
          Cancel
        </SecondaryButton>
        <PrimaryButton 
          onClick={() => handleConfirm(onConfirm)}
          disabled={!name.trim()}
          className={!name.trim() ? 'opacity-50 cursor-not-allowed' : ''}
        >
          Save
        </PrimaryButton>
      </Modal.Buttons>
    </Modal>
  );
};

export default NamePromptModal;
