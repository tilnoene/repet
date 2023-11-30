import { PulseLoader } from 'react-spinners';

import config from '../../config.json';

const LoadingPoints = () => (
  <PulseLoader
    color={config.colors.primaryBlue}
    size={10}
    speedMultiplier={0.75}
    margin={4}
  />
);

export default LoadingPoints;
