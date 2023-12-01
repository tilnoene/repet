import PrimaryText from '../PrimaryText';

import { ContainerInput, InputStyle } from './styles';

const Input = ({
  label = '',
  placeholder = '',
  value,
  setValue,
  type = 'text',
  required = false,
  ...props
}: {
  label?: string;
  placeholder?: string;
  value: string;
  setValue: any; // TODO: tipar
  type?: string;
  required?: boolean;
}) => {
  return (
    <ContainerInput>
      <label htmlFor={`input-${label}`}>
        <PrimaryText fontSize="16px">
          {label}
          {required && ' *'}
        </PrimaryText>
      </label>

      <InputStyle
        type={type}
        id={`input-${label}`}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        {...props}
      />
    </ContainerInput>
  );
};

export default Input;
