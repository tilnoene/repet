import { Text } from './styles';

const SecondaryText = ({
  isWhite = false,
  fontSize = '20px',
  children,
  italic = false,
  ...props
}: {
  isWhite?: boolean;
  fontSize?: string;
  children: any;
  italic?: boolean;
}) => {
  return (
    <Text isWhite={isWhite} fontSize={fontSize} italic={italic} {...props}>
      {children}
    </Text>
  );
};

export default SecondaryText;
