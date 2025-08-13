// DrugTypeSelector - Component for selecting the type of drug in strain creation.
// Allows users to choose between different drug types, each represented by an emoji and name.

// Importing data and UI components.
import { drugTypes } from '@features/strain-creator/data/strainData';
import SelectorHeader from '@features/strain-creator/ui/primitives/SelectorHeader';
import DrugTypeButton from '@features/strain-creator/ui/buttons/DrugTypeButton';

const DrugTypeSelector = ({ selectedDrugType, setSelectedDrugType }) => {
  // Selected drug type and setter from the strain selection hook.
  // If no drug type is selected, it defaults to 'weed'.
  //const { selectedDrugType, setSelectedDrugType } = useStrainSelection();

  // Render the drug type selector with buttons for each drug type:
  return (
    <div className="mb-6">
      <SelectorHeader>Select Product Type</SelectorHeader>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(drugTypes).map(([key, drug]) => (
          <DrugTypeButton
            key={key}
            drugKey={key}
            drug={drug}
            selectedDrugType={selectedDrugType}
            setSelectedDrugType={setSelectedDrugType}
          />
        ))}
      </div>
    </div>
  );
};
export default DrugTypeSelector;