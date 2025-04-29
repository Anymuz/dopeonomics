// src/components/SalesHistory/SalesHistoryContainer.jsx
import SalesHistoryTab from './SalesHistoryTab';
import { useSalesHistory } from '@hooks';

const SalesHistoryContainer = () => {
  const { salesHistory } = useSalesHistory();

  return <SalesHistoryTab salesHistory={salesHistory} />;
};

export default SalesHistoryContainer;