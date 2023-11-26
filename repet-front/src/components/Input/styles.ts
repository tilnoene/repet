import styled from "styled-components";

import config from '../../config.json';

export const ContainerInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InputStyle = styled.input`
  background: transparent;
  padding: 8px 12px;
  border: 2px solid ${ config.colors.gray };
  border-radius: 12px;
  outline: none;

  font-family: 'Lexend';

  &:focus {
    border-color: ${ config.colors.primaryBlue };
  }
`;
