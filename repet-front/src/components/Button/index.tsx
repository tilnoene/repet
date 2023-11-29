import { ContainerButton, ContainerButtonLoading } from './styles';

import config from '../../config.json';

import { BeatLoader } from 'react-spinners';

const Button = ({
  name = '',
  onClick = null,
  loading = false,
  color = 'blue',
}: {
  name?: string;
  onClick?: any;
  loading?: boolean;
  color?: string;
}) => {
  return loading ? (
    <ContainerButtonLoading>
      <BeatLoader
        color={config.colors.secondaryText}
        speedMultiplier={0.8}
        size={12}
        margin={4}
      />
    </ContainerButtonLoading>
  ) : (
    <ContainerButton onClick={onClick} color={color}>
      {name}
    </ContainerButton>
  );
};

export default Button;
