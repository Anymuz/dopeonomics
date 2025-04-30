// src/components/MyStrains/MyStrainsContainer.jsx
import MyStrainsTab from './MyStrainsTab';
import { useStrains } from '@hooks';

const MyStrainsContainer = () => {
  const { strains } = useStrains();
  return <MyStrainsTab strains={strains} />;
};

export default MyStrainsContainer;