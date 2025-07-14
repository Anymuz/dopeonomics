// Custom hook for packaging type for use by PackagingSelector UI component in the strain creator feature.

// Import useState from React to manage state.
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