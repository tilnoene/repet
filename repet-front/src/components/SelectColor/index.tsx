import { useState } from 'react';

import PrimaryText from '../PrimaryText';

import { Color, ContainerColors, ContainerSelect } from './styles';

import config from '../../config.json';

const SelectColor = ({
  label = '',
  required = false,
  value = config.colors.primaryBlue,
  setValue = undefined,
}: {
  label?: string;
  required?: boolean;
  value?: string;
  setValue?: any;
}) => {
  const colors = [
    config.colors.primaryBlue,
    config.colors.red,
    config.colors.green,
    config.colors.yellow,
  ];

  return (
    <ContainerSelect>
      <PrimaryText fontSize="16px">
        {label}
        {required && ' *'}
      </PrimaryText>

      <ContainerColors>
        {colors.map(color => (
          <Color
            key={color}
            selected={value === color}
            color={color}
            onClick={() => setValue(color)}
          />
        ))}
      </ContainerColors>
    </ContainerSelect>
  );
};

export default SelectColor;
