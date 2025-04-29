// src/components/SupplyManagement/SupplyManagementContainer.jsx
import SupplyManagementTab from './SupplyManagementTab';
// (future) import { useSupply, useSupplyHistory } from '@hooks';

const SupplyManagementContainer = () => {
  const supplies = [
    { id: 1, item: 'THC Crystal', quantity: 20 },
    { id: 2, item: 'CBD Oil', quantity: 35 },
  ];

  const supplyHistory = [
    { id: 1, item: 'THC Crystal', quantityAdded: 10, date: '2025-04-27' },
    { id: 2, item: 'CBD Oil', quantityAdded: 15, date: '2025-04-28' },
  ];

  return <SupplyManagementTab supplies={supplies} supplyHistory={supplyHistory} />;
};

export default SupplyManagementContainer;