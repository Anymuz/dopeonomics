// src/components/CrewManagement/CrewManagementContainer.jsx
import { useState, useEffect } from 'react';
import CrewOverviewTab from './tabs/CrewOverviewTab';
import CrewDealersTab from './tabs/CrewDealersTab';
import CrewMembersTab from './tabs/CrewMembersTab';
import CrewTransactionsTab from './tabs/CrewTransactionsTab';
import CrewManagementNav from './CrewManagementNav';
import { useDealers, useCrew, useDealerTransactions, useSales } from '@/hooks';
import { defaultDealers, crewCosts, startCrew } from '@data/crewData';

const CrewManagementContainer = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const { dealers, setDealers } = useDealers();
  const { crew, setCrew } = useCrew();
  const { transactions, addDealerTransaction} = useDealerTransactions();
  const { dailySales, addDailySale } = useSales();

  // Function to add a dealer transaction
  const addTransaction = (transaction) => {
    addDealerTransaction(transaction);
  };

  // Function to add a sales record
  const addPersonalSale = (sale) => {
    addDailySale(sale);
  };

  // Modify crew count
  const adjustCrewCount = (type, increment) => {
    if (!crew || typeof crew !== 'object') return;

    setCrew({
      botanist: Math.max(0, (crew.botanist ?? 0) + (type === 'botanist' ? increment : 0)),
      cleaner: Math.max(0, (crew.cleaner ?? 0) + (type === 'cleaner' ? increment : 0)),
      handler: Math.max(0, (crew.handler ?? 0) + (type === 'handler' ? increment : 0)),
      chemist: Math.max(0, (crew.chemist ?? 0) + (type === 'chemist' ? increment : 0))
    });
  };

  // Toggle if dealer is active
  const toggleDealerStatus = (id) => {
    setDealers(
      dealers.map(dealer => 
        dealer.id === id ? { ...dealer, active: !dealer.active } : dealer
      )
    );
  };

  // Initalise crew object if first time use
  useEffect(() => {
    const crewIsInvalid = crew === null || typeof crew !== 'object' || Object.keys(crew).length === 0 || Object.values(crew).some((v) => typeof v !== 'number');

    if (crewIsInvalid) {
      console.log("Invalid or empty crew detected, initializing with startCrew.");
      setCrew(startCrew);
    }
  }, [crew, setCrew]);

  // Initalise dealers object if first time use
  useEffect(() => {
    if (!dealers || dealers.length === 0) {
      setDealers(defaultDealers);
    }
  }, [dealers, setDealers]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <CrewOverviewTab 
          crew={crew}
          dailySales={dailySales}
          dealers={dealers}
          transactions={transactions}
        />;
      case 'dealers':
        return <CrewDealersTab 
          addTransaction={addTransaction}
          dealers={dealers}
          toggleDealerStatus={toggleDealerStatus}
        />;
      case 'members':
        return <CrewMembersTab 
          addPersonalSale={addPersonalSale}
          adjustCrewCount={adjustCrewCount}
          crew={crew}
          crewCosts={crewCosts}
        />; 
      case 'transactions':
        return <CrewTransactionsTab 
          dailySales={dailySales}
          transactions={transactions}
        />;
      default:
        return null;
    }
  };

  return (
    <>
      < CrewManagementNav
        activeTab={activeTab}
        renderActiveTab={renderActiveTab}
        setActiveTab={setActiveTab}
      />
    </>
  );
};

export default CrewManagementContainer;