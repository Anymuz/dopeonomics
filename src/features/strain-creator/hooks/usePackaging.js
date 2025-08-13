// Hook for managing packaging type selection in the strain creator.
// Provides state management for packaging type which affects profit calculations and display.

// Importing React hooks for state management.
import { useState } from "react";

const usePackaging = (initalPackageType=null) => {
  // State variables to manage the packaging type
  const [packagingType, setPackagingType] = useState(initalPackageType);
  
  // Return the current packaging type and the function to update it for use by components.
  return {
    packagingType,
    setPackagingType,
  };
}
export default usePackaging;