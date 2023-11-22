import { Text } from './styles';

const SecondaryText = ({ children, ...props }: any) => {
  return <Text {...props}>{children}</Text>
}

export default SecondaryText;
