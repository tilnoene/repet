import { Container } from './styles';

const Card = ({
  borderRadius = '6px',
  children,
}: {
  borderRadius?: string;
  children: any;
}) => {
  return <Container borderRadius={borderRadius}>{children}</Container>;
};

export default Card;
