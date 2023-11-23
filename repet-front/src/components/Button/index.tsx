import { ContainerButton, ContainerButtonLoading } from './styles';

const Button = ({
  name = '',
  onClick = null,
  loading = false,
}: {
  name?: string;
  onClick?: any;
  loading?: boolean;
}) => {
  return loading ? (
    <ContainerButtonLoading>{name}</ContainerButtonLoading> // TODO: loading icon
  ) : (
    <ContainerButton onClick={onClick}>{name}</ContainerButton>
  );
};

export default Button;
