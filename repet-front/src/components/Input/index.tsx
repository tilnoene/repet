import PrimaryText from '../PrimaryText';
import { ContainerInput, InputStyle } from './styles';

const Input = ({
  label = '',
  placeholder = '',
  value,
  setValue,
  type = 'text',
  ...props
}: {
  label?: string;
  placeholder?: string;
  value: string;
  setValue: any; // TODO: tipar
  type?: string;
}) => {
  return (
    <ContainerInput>
      <label htmlFor="input">
        <PrimaryText fontSize="16px">{label}</PrimaryText>
      </label>

      <InputStyle
        type={type}
        id="input"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        {...props}
      />
    </ContainerInput>
  );
};

export default Input;
