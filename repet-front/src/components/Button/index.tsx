import {
  ContainerButton,
  ContainerButtonLoading,
  ContainerButtonOutlined,
} from './styles';

import config from '../../config.json';

import { BeatLoader } from 'react-spinners';

const Button = ({
  name = '',
  onClick = null,
  loading = false,
  color = 'blue',
  variant = 'normal',
  type = 'button',
}: {
  name?: string;
  onClick?: any;
  loading?: boolean;
  color?: string;
  variant?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}) => {
  return loading ? (
    <ContainerButtonLoading>
      <BeatLoader
        color={config.colors.secondaryText}
        speedMultiplier={0.8}
        size={10}
        margin={5}
      />
    </ContainerButtonLoading>
  ) : variant === 'outlined' ? (
    <ContainerButtonOutlined type={type} onClick={onClick}>
      {name}
    </ContainerButtonOutlined>
  ) : (
    <ContainerButton type={type} onClick={onClick} color={color}>
      {name}
    </ContainerButton>
  );
};

export default Button;
