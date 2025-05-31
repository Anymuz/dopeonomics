/* eslint-disable no-unused-vars */
// Main Container which serves as the top parent //
// - Loads all other container components
// - Loads the presistent storage via hooks @src/hooks
// - Loads the navigation bar and renderes the active tab content
import { useEffect } from 'react';

import { 
  useCrew,
  useDealers,
  useDealerTransactions,
  useMixes,
  useProductionPlans,
  useSales,
  useSalesHistory,
  useSettings,
  useSupply,
  useSupplyHistory 
} from '@hooks';

// Containers for each component correlating to a tabb
import StrainCreatorContainer from '@components/StrainCreator/StrainCreatorContainer';
import EffectBuilderContainer from '@components/EffectBuilder/EffectBuilderContainer';
import MyStrainsContainer from '@components/MyStrains/MyStrainsContainer';
import ProductionPlanningContainer from '@components/ProductionPlanning/ProductionPlanningContainer';
import CrewManagementContainer from '@components/CrewManagement/CrewManagementContainer';
import SalesHistoryContainer from '@components/SalesHistory/SalesHistoryContainer';
import SupplyManagementContainer from '@components/SupplyManagement/SupplyManagementContainer';
import NavigationBar from '@components/SharedComponents/Navigation/NavigationBar';

// Load default data
import { tabList } from '@data/navigationData';
import { defaultDealers, startCrew } from '@data/crewData';

const ApplicationnContainer = () => {
  // Load persistent game store via hooks
  const { crew, setCrew, resetCrew} = useCrew();
  const { dealers, setDealers, resetDealers } = useDealers();
  const { transactions, setDealerTransactions, addDealerTransaction, resetDealerTransactions } = useDealerTransactions();  
  const { mixes, addMix, setMixes, resetMixes } = useMixes();
  const { productionPlans, setProductionPlans, addPlan, updatePlanStatus, deletePlan } = useProductionPlans();
  const { dailySales, getDailySales, setDailySales, addDailySale, resetDailySales } = useSales();
  const { salesHistory, setSalesHistory, resetSalesHistory } = useSalesHistory();
  const { activeTab, setActiveTab } = useSettings();
  const { supply, setSupply, resetSupply } = useSupply();                                                          
  const { supplyHistory, setSupplyHistory, resetSupplyHistory } = useSupplyHistory();

  // Initalise Data when first mounted
  // Set to startCrew object
  useEffect(() => {
    const crewIsInvalid = crew === null || typeof crew !== 'object' || Object.keys(crew).length === 0 || Object.values(crew).some((v) => typeof v !== 'number');

    if (crewIsInvalid) {
      console.log("Invalid or empty crew detected, initializing with startCrew.");
      setCrew(startCrew);
    }
  }, [crew, setCrew]);

  // Load default dealers list
  useEffect(() => {
    if (!dealers || dealers.length === 0) {
      setDealers(defaultDealers);
    }
  }, [dealers, setDealers]);

  // Function to switch between which tab to render
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'creator':
        return <StrainCreatorContainer />;
      case 'effectBuilder':
        return <EffectBuilderContainer />;
      case 'myStrains':
        return <MyStrainsContainer />;
      case 'production':
        return <ProductionPlanningContainer />;
      case 'crew':
        return <CrewManagementContainer />;
      case 'sales':
       return <SalesHistoryContainer />;
      case 'supplies':
        return <SupplyManagementContainer />;
      default:
        return <StrainCreatorContainer />;
    }
  };

  return (
    // Main HTML elements to contain all rendered content including the navigation bar
    <div className="bg-gradient-to-br from-gray-100 to-gray-50 min-h-screen flex justify-center items-start py-8">
      <div className="w-full max-w-5xl mx-auto p-4">
        <NavigationBar
          tabList={tabList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {renderActiveTab()}
    </div>
  </div>
  );
};

export default ApplicationnContainer
