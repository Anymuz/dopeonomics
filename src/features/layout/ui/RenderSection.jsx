// RenderSection component to render the currently active tab's content.

// Importing necessary components and hooks.
import StrainCreatorTab from '@features/strain-creator/ui/StrainCreatorTab';
import WorkInProgress from '@features/maintainence/ui/WorkInProgress';
import useNav from '@features/layout/hooks/useNav';

const RenderSection = () => {
  const {activeTab} = useNav();
  console.log("Active Tab:", activeTab);
  switch (activeTab) {
    // TODO: Add cases for each tab here.
    case 'creator':
      return <StrainCreatorTab />;
    case 'effect_builder':
      return <WorkInProgress label={activeTab} />;
    default:
      return <WorkInProgress label={activeTab} />
  };
};
export default RenderSection;