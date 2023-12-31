import PrimaryText from '../PrimaryText';

import { ContainerCheckbox, CheckboxStyle } from './styles';

const Checkbox = ({
  label = '',
  value,
  setValue,
}: {
  label?: string;
  value: boolean;
  setValue: any;
}) => {
  return (
    <ContainerCheckbox>
      <CheckboxStyle
        id={`checkbox-${label}`}
        type="checkbox"
        checked={value}
        onChange={() => setValue(!value)}
      />

      <label htmlFor={`checkbox-${label}`}>
        <PrimaryText fontSize="16px">{label}</PrimaryText>
      </label>
    </ContainerCheckbox>
  );
};

export default Checkbox;
