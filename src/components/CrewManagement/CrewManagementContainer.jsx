// src/components/CrewManagement/CrewManagementContainer.jsx
import CrewManagementTab from './CrewManagementTab';
// (future) import { useCrew, useDealers } from '@hooks';

const CrewManagementContainer = () => {
  const crewMembers = [
    { id: 1, name: 'John', role: 'Breeder' },
    { id: 2, name: 'Jane', role: 'Grower' },
  ];

  const dealers = [
    { id: 1, name: 'Tommy', region: 'East District' },
    { id: 2, name: 'Sara', region: 'West District' },
  ];

  return <CrewManagementTab crewMembers={crewMembers} dealers={dealers} />;
};

export default CrewManagementContainer;