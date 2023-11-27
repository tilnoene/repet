import styled from 'styled-components';

import config from '../../config.json';

export const ContainerButton = styled.button`
  appearance: none;
  outline: none;
  background: ${config.colors.primaryBlue};
  box-sizing: border-box;
  border-style: none;
  border-radius: 10px;
  padding: 12px 16px;
  cursor: pointer;

  color: white;
  font-family: 'Lexend';
  font-size: 16px;
  font-weight: 600;
  width: 100%;

  &:hover {
    background: ${config.colors.secondaryBlue};
    opacity: 1;
    transform: translateY(0);
    transition-duration: 0.35s;
  }

  &:hover:after {
    opacity: 0.5;
  }

  &:active {
    box-shadow: rgba(0, 0, 0, 0.1) 0 3px 6px 0, rgba(0, 0, 0, 0.1) 0 0 10px 0,
      rgba(0, 0, 0, 0.1) 0 1px 4px -1px;
    // transform: translateY(1px);
    transition-duration: 0.1s;
  }

  &:active:after {
    opacity: 1;
  }
`;


export const ContainerButtonLoading = styled.button`
  appearance: none;
  outline: none;
  background: ${config.colors.gray};
  box-sizing: border-box;
  border-style: none;
  border-radius: 10px;
  padding: 12px 16px;
  cursor: pointer;

  color: white;
  font-family: 'Lexend';
  font-size: 16px;
  font-weight: 600;
  width: 100%;
`;
