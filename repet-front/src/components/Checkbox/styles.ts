import styled from 'styled-components';

import config from '../../config.json';

export const ContainerCheckbox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 8px 0;
`;

export const CheckboxStyle = styled.input`
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 0.15em;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  cursor: pointer;

  &::before {
    content: '';
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 60ms transform ease-in-out;
    box-shadow: inset 1em 1em ${ config.colors.primaryBlue };
  }

  &:checked::before {
    transform: scale(1);
    background: blue;
  }
`;
