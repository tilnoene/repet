import { Text } from './styles';

const PrimaryText = ({
  isWhite = false,
  fontSize = '20px',
  children,
}: {
  isWhite?: boolean;
  fontSize?: string;
  children: any;
}) => {
  return (
    <Text isWhite={isWhite} fontSize={fontSize}>
      {children}
    </Text>
  );
};

export default PrimaryText;
