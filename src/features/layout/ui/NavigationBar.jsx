// NavigationBar to render a list of navigation tabs.
// Maps over a list of tabs and renders each one with an icon and label.

// Importing hook, data and tab component.
import NavigationTab from '@features/layout/ui/buttons/NavigationTab';
import useNav from '@features/layout/hooks/useNav';
import tabList from '@features/layout/data/tabList';

import {formatSnake} from '@shared/utils/stringUtils';

const NavigationBar = () => {
  const { activeTab, setActiveTab } = useNav();
  return (
    <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
      {Object.entries(tabList).map(
        ([key, { tabColor, label, icon }]) => (
          <NavigationTab
            key={key}
            // Turn to valid tab key (lowercase no spaces) for use in RenderSection:
            tabKey={formatSnake(label)} 
            activeTab={activeTab}
            color={tabColor}
            // Use the icon component directly:
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