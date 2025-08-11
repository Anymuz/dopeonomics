// Search - Just eliminates CSS repetition
import React from 'react';
import { Search, X } from 'lucide-react';

const SearchInput = ({ value, onChange, onClear, placeholder = "Search...", className = "", ...props }) => {
  return (
    <div className={`relative w-full md:w-64 ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 pl-9 text-sm border rounded-md"
        {...props}
      />
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      {value && onClear && (
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={onClear}
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
