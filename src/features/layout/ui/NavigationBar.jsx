import NavigationTab from '@features/layout/ui/NavigationTab';
import useNav from '@features/layout/hooks/useNav';
import tabList from '@features/layout/data/tabList';

export const NavigationBar = () => {
  const { activeTab, setActiveTab } = useNav();
  return (
    <div className="flex space-x-2 mb-4">
      {Object.entries(tabList).map(
        ([key, { label, icon }]) => (
          <NavigationTab
            key={key}
            tabKey={key}
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