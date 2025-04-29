// src/components/MyStrains/MyStrainsContainer.jsx
import MyStrains from './MyStrains';
 import { useStrains } from '@hooks';

const MyStrainsContainer = () => {
  const { strains } = useStrains();

  return <MyStrains strains={strains} />;
};

export default MyStrainsContainer;