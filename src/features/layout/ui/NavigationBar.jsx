// NavigationBar to render a list of navigation tabs.
// Maps over a list of tabs and renders each one with an icon and label.

// Importing hook, data and tab component.
import NavigationTab from '@features/layout/ui/NavigationTab';
import useNav from '@features/layout/hooks/useNav';
import tabList from '@features/layout/data/tabList';

const NavigationBar = () => {
  const { activeTab, setActiveTab } = useNav();
  return (
    <div className="flex space-x-2 mb-4">
      {Object.entries(tabList).map(
        ([key, { label, icon }]) => (
          <NavigationTab
            key={key}
            // Turn to valid tab key (lowercase no spaces) for use in RenderSection:
            tabKey={label.toLowerCase().replace(/\s+/g, '_')} 
            activeTab={activeTab}
            Icon={icon}
            label={label}
            setActiveTab={setActiveTab}
          />
        ) 
      )}
    </div>
  )
};
export default NavigationBar;