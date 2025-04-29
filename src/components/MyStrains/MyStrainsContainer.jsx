// src/components/MyStrains/MyStrainsContainer.jsx
import MyStrains from './MyStrains';
// (future) import { useStrains } from '@hooks';

const MyStrainsContainer = () => {
  // Temporary dummy strains for now
  const strains = [
    { id: 1, name: 'Purple Haze', potency: 'High' },
    { id: 2, name: 'White Widow', potency: 'Medium' },
  ];

  return <MyStrains strains={strains} />;
};

export default MyStrainsContainer;