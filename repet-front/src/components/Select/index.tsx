import PrimaryText from '../PrimaryText';
import { ContainerSelect, SelectStyle } from './styles';

const Select = ({
  label = '',
  placeholder = '',
  setValue,
  options = [],
}: {
  label?: string;
  placeholder?: string;
  setValue: any; // TODO: tipar
  options?: any[];
}) => {
  return (
    <ContainerSelect>
      <label htmlFor="select">
        <PrimaryText fontSize="16px">{label}</PrimaryText>
      </label>

      <SelectStyle
        id="select"
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        defaultValue=""
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
