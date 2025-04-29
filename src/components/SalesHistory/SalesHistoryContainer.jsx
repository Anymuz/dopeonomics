// src/components/SalesHistory/SalesHistoryContainer.jsx
import SalesHistoryTab from './SalesHistoryTab';
// (future) import { useSalesHistory } from '@hooks';

const SalesHistoryContainer = () => {
  const salesHistory = [
    { id: 1, dealer: 'Tommy', amount: 500, date: '2025-04-28' },
    { id: 2, dealer: 'Sara', amount: 750, date: '2025-04-29' },
  ];

  return <SalesHistoryTab salesHistory={salesHistory} />;
};

export default SalesHistoryContainer;