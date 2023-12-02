import styled from 'styled-components';

import config from '../../config.json';

export const ContainerModalOptions = styled.div`
  position: relative;
`;

export const ContentModalOptions = styled.div`
  margin-top: -24px;
  margin-left: calc(34px - 140px);
  width: 140px;
  background: ${config.colors.white};
  z-index: 2;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.2);
  display: grid;
  border-radius: 8px;
  position: absolute;
`;

type OptionProps = {
  paddingLeft?: string;
  centered?: boolean;
};

export const Option = styled.div<OptionProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${props => (props?.centered ? 'center' : 'flex-start')};
  padding: 10px;
  gap: 8px;
  padding-left: ${props => (props.paddingLeft ? props.paddingLeft : '10px')};
  cursor: pointer;

  &:hover {
    background: rgb(0, 0, 0, 0.1);
  }

  &:active {
    background: rgb(0, 0, 0, 0.15);
  }
`;

export const Divider = styled.div`
  width: 85%;
  height: 2px;
  background: ${config.colors.gray500};
  justify-self: center;
`;
