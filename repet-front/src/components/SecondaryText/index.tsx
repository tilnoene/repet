import { Text } from './styles';

const SecondaryText = ({
  isWhite = false,
  fontSize = '20px',
  children,
  ...props
}: {
  isWhite?: boolean;
  fontSize?: string;
  children: any;
}) => {
  return (
    <Text isWhite={isWhite} fontSize={fontSize} {...props}>
      {children}
    </Text>
  );
};

export default SecondaryText;
