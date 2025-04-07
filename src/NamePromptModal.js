// NamePromptModal.js
import React, { useState, useEffect } from 'react';
import { XCircle } from 'lucide-react';

export const NamePromptModal = ({ isOpen, onClose, onSave, initialName = '' }) => {
  const [name, setName] = useState(initialName);

  // Reset name when modal opens
  useEffect(() => {
    if (isOpen) {
      setName(initialName);
    }
  }, [isOpen, initialName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Name Your Creation</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="strain-name" className="block text-sm font-medium text-gray-700 mb-1">
              Give your creation a memorable name:
            </label>
            <input
              type="text"
              id="strain-name"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-300"
              placeholder="Enter a name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={!name.trim()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};