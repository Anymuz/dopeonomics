// src/components/Modals/NamePromptModal.jsx
import React, { useState, useEffect } from 'react';

const NamePromptModal = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isOpen) setName('');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-3">Name Your Creation</h2>
        <p className="text-sm text-gray-600 mb-2">Give your creation a memorable name:</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(name);
            }}
            disabled={!name.trim()}
            className={`px-4 py-2 text-sm rounded ${
              name.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-100 text-blue-400'
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NamePromptModal;
