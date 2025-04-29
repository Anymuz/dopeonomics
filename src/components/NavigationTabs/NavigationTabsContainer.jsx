// src/components/NavigationTabs/NavigationTabsContainer.jsx
import NavigationTabs from './NavigationTabs';
import { useSettings } from '@hooks';

const tabList = [
  'Creator',
  'Effect Builder',
  'My Strains',
  'Production',
  'Crew',
  'Sales',
  'Supplies',
];

const NavigationTabsContainer = () => {
  const { activeTab, setActiveTab } = useSettings();

  return (
    <NavigationTabs
      tabs={tabList}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
};

export default NavigationTabsContainer;
