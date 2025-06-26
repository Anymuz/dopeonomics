import WorkInProgress from '@features/maintainence/ui/WorkInProgress';
import useNav from '@features/layout/hooks/useNav';

// ActiveTab component to render the currently active tab's content
const RenderSection = () => {
  const [activeTab] = useNav();
  console.log("Active Tab:", activeTab);
  switch (activeTab) {
    // TODO: Add cases for each tab here.
    default:
      return <WorkInProgress label={activeTab} />
  };
};
export default RenderSection;