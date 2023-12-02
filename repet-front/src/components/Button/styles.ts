import styled from 'styled-components';

import config from '../../config.json';

type ContainerButtonProps = {
  color: string;
};

export const ContainerButton = styled.button<ContainerButtonProps>`
  appearance: none;
  outline: none;
  background: ${props =>
    props.color === 'blue'
      ? config.colors.primaryBlue
      : props.color === 'green'
      ? config.colors.green
      : config.colors.red};
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
    background: ${props =>
      props.color === 'blue'
        ? config.colors.secondaryBlue
        : config.colors.secondaryRed};
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

export const ContainerButtonOutlined = styled.button`
  appearance: none;
  outline: none;
  background: ${config.colors.gray300};
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
    background: ${config.colors.gray500};
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

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
