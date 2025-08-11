// Modal - Just eliminates CSS repetition
import React from 'react';
import { X } from 'lucide-react';
import { IconButton } from './Button.jsx';

const Modal = ({ children, className = "", onClose, ...props }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" {...props}>
      <div className={`bg-white rounded-lg p-6 max-w-md w-full relative ${className}`}>
        {onClose && (
          <IconButton
            icon={X}
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            title="Close"
          />
        )}
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({ children, className = "", hasCloseButton = false, ...props }) => {
  return (
    <h3 className={`text-lg font-medium text-gray-900 mb-4 ${hasCloseButton ? 'pr-8' : ''} ${className}`} {...props}>
      {children}
    </h3>
  );
};

const ModalButtons = ({ children, className = "", ...props }) => {
  return (
    <div className={`flex justify-end space-x-3 ${className}`} {...props}>
      {children}
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Buttons = ModalButtons;

export default Modal;
