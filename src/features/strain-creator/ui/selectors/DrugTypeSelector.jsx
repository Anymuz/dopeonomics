// Component to select the type of drug for the strain creator.
// Allows users to choose between different drug types, each represented by an emoji and name.

// Import hook for selection and data for drug types.
//import useStrainSelection from '@features/strain-creator/hooks/useStrainSelection';
import { drugTypes } from '@features/strain-creator/data/strainData';

const DrugTypeSelector = ({ selectedDrugType, setSelectedDrugType }) => {
  // Selected drug type and setter from the strain selection hook.
  // If no drug type is selected, it defaults to 'weed'.
  //const { selectedDrugType, setSelectedDrugType } = useStrainSelection();

  // Render the drug type selector with buttons for each drug type:
  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-gray-700 mb-2">Select Product Type</h3>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(drugTypes).map(([key, drug]) => (
        // A button is created for each drug type, the way it is stored in strainData has the key as lowercase name.
        // The selected drug type is highlighted with a different background and border color.
          <button
            key={key}
            className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2
              ${selectedDrugType === key
                ? 'bg-blue-50 border-blue-500 shadow-md' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
            onClick={() => setSelectedDrugType(key)}
          >
            {/*Each button displays the drug type's emoji, name, base price and unit measure.*/}
            <span className="text-3xl">{drug.emoji}</span>
            <div className="font-medium text-center">{drug.name}</div>
            <div className="text-xs text-gray-500 text-center">${drug.basePrice} per {drug.unit}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
export default DrugTypeSelector;