// RenderSection component to render the currently active tab's content.

// Importing necessary components and hooks.
import StrainCreatorTab from '@features/strain-creator/ui/StrainCreatorTab';
import WorkInProgress from '@features/maintainence/ui/WorkInProgress';
import useNav from '@features/layout/hooks/useNav';

const RenderSection = () => {
  const {activeTab} = useNav();

  console.log("Active Tab:", activeTab);
  let render;
  switch (activeTab) {
    // TODO: Add cases for each tab here.
    case 'creator':
      render = <StrainCreatorTab />;
      break;
    case 'effect_builder':
      render = <WorkInProgress label={activeTab} />;
      break;
    default:
      render = <WorkInProgress label={activeTab} />;
      break;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">
      {render}
    </div>
  );
};
export default RenderSection;