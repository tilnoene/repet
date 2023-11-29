import { ContainerButton, ContainerButtonLoading } from './styles';

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
    <ContainerButtonLoading>{name}</ContainerButtonLoading> // TODO: loading icon
  ) : (
    <ContainerButton onClick={onClick} color={color}>
      {name}
    </ContainerButton>
  );
};

export default Button;
