// src/components/NavigationTabs/ActiveTabRender.jsx
import NavigationTabsContainer from '@components/NavigationTabs/NavigationTabsContainer';
import { useSettings } from '@hooks';

import StrainCreatorContainer from '@components/StrainCreator/StrainCreatorContainer';
import EffectBuilderContainer from '@components/EffectBuilder/EffectBuilderContainer';
import MyStrainsContainer from '@components/MyStrains/MyStrainsContainer';
import ProductionPlanningContainer from '@components/ProductionPlanning/ProductionPlanningContainer';
import CrewManagementContainer from '@components/CrewManagement/CrewManagementContainer';
import SalesHistoryContainer from '@components/SalesHistory/SalesHistoryContainer';
import SupplyManagementContainer from '@components/SupplyManagement/SupplyManagementContainer';

const ActiveTabRender = () => {
  const { activeTab } = useSettings();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Creator':
        return <StrainCreatorContainer />;
      case 'Effect Builder':
        return <EffectBuilderContainer />;
      case 'My Strains':
        return <MyStrainsContainer />;
      case 'Production':
        return <ProductionPlanningContainer />;
      case 'Crew':
        return <CrewManagementContainer />;
      case 'Sales':
       return <SalesHistoryContainer />;
      case 'Supplies':
        return <SupplyManagementContainer />;
      default:
        return <StrainCreatorContainer />;
    }
  };

  return (
    <div className="space-y-6">
      <NavigationTabsContainer />
      {renderActiveTab()}
    </div>
  );
};

export default ActiveTabRender
