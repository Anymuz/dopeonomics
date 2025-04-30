// src/components/SupplyManagement/SupplyManagementContainer.jsx
import SupplyManagementTab from './SupplyManagementTab';
import { useSupply, useSupplyHistory } from '@hooks';

const SupplyManagementContainer = () => {
  const { supply } = useSupply();
  const { supplyHistory } = useSupplyHistory();

  return <SupplyManagementTab supplies={supply} supplyHistory={supplyHistory} />;
};

export default SupplyManagementContainer;