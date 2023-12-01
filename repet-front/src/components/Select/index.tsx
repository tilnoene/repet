import PrimaryText from '../PrimaryText';
import { ContainerSelect, SelectStyle } from './styles';

const Select = ({
  label = '',
  placeholder = '',
  setValue,
  options = [],
  required = false,
  defaultValue = '',
}: {
  label?: string;
  placeholder?: string;
  setValue: any;
  options?: any[];
  required?: boolean;
  defaultValue?: string;
}) => {
  return (
    <ContainerSelect>
      <label htmlFor={`select-${label}`}>
        <PrimaryText fontSize="16px">
          {label}
          {required && ' *'}
        </PrimaryText>
      </label>

      <SelectStyle
        id={`select-${label}`}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        defaultValue={defaultValue}
      >
        <option value="" disabled>
          Selecione uma opção
        </option>

        {options.map((option: any) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </SelectStyle>
    </ContainerSelect>
  );
};

export default Select;
