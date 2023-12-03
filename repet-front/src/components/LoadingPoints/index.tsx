import { PulseLoader } from 'react-spinners';

import config from '../../config.json';

const LoadingPoints = ({
  color = config.colors.primaryBlue,
  size = 10,
  margin = 4,
}: {
  color?: string;
  size?: number;
  margin?: number;
}) => (
  <PulseLoader
    color={color}
    size={size}
    speedMultiplier={0.75}
    margin={margin}
  />
);

export default LoadingPoints;
