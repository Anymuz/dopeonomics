// src/components/SharedComponents/MixDisplayComponents/MixDisplayComponentsContainer.jsx
import MixDisplayComponents from './MixDisplayComponents';
import { useMixes } from '@hooks';
const MixDisplayComponentsContainer = () => {
  const {mixes} = useMixes()
  return <MixDisplayComponents mixes={mixes} />;
};

export default MixDisplayComponentsContainer;
