// src/components/CrewManagement/CrewManagementContainer.jsx
import CrewManagementTab from './CrewManagementTab';
import { useCrew, useDealers } from '@hooks';

const CrewManagementContainer = () => {
  const { crew } = useCrew();
  const { dealers } = useDealers();

  return <CrewManagementTab crewMembers={crew} dealers={dealers} />;
};

export default CrewManagementContainer;