import { Container, Content } from './styles';

export const ForceMobile = ({ children }: any) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

export default ForceMobile;
