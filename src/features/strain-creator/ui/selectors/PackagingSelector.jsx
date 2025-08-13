// PackagingSelector - Component for selecting packaging type for strain products.
// Allows users to choose between different packaging options that affect profit calculations.

// Importing data, hooks, and UI components for packaging selection.
import { packagingTypes } from '@features/strain-creator/data/strainData';
import usePackaging from '@features/strain-creator/hooks/usePackaging';
import PackagingButton from '@features/strain-creator/ui/buttons/packagingButton';
import SelectorHeader from '@features/strain-creator/ui/primitives/SelectorHeader';

const PackagingSelector = () => {
  const { packagingType, setPackagingType } = usePackaging('baggies');

  return (
    <div className="mb-6">
      <SelectorHeader>Packaging Type</SelectorHeader>
      <div className="flex gap-4">
        {packagingTypes.map(packaging => (
          <PackagingButton
            key={packaging.type}
            type={packaging.type}
            cost={packaging.cost}
            capacity={packaging.capacity}
            packagingType={packagingType}
            setPackagingType={setPackagingType}
          />
        ))}
      </div>
    </div>
  );
};

export default PackagingSelector;