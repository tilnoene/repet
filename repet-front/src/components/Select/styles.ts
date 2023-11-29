import styled from 'styled-components';

import config from '../../config.json';

export const ContainerSelect = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SelectStyle = styled.select`
  // TODO: style arrow select
  width: 100%;
  background: transparent;
  padding: 8px 12px;
  border: 2px solid ${config.colors.gray};
  border-radius: 12px;
  outline: none;
  font-family: 'Lexend';

  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;

  &:focus {
    border-color: ${config.colors.primaryBlue};
  }
`;
