import PrimaryText from '../PrimaryText';

import { ContainerInput, InputStyle } from './styles';

const Input = ({
  label = '',
  placeholder = '',
  value,
  setValue,
  required = false,
}: {
  label?: string;
  placeholder?: string;
  value: string;
  setValue: any;
  required?: boolean;
}) => {
  return (
    <ContainerInput>
      <label htmlFor="input">
        <PrimaryText fontSize="16px">
          {label}
          {required && ' *'}
        </PrimaryText>
      </label>

      <InputStyle
        id="input"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </ContainerInput>
  );
};

export default Input;
