import styled from 'styled-components';

import config from '../../config.json';

export const ContainerSelect = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ContainerColors = styled.div`
  display: flex;
  gap: 12px;
`;

type ColorProps = {
  color: string;
  selected: boolean;
};

export const Color = styled.div<ColorProps>`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 3px solid ${props => props.color};
  background: ${props => (props.selected ? props.color : 'transparent')};
  box-shadow: 0 0 0 4px ${config.colors.background} inset;
  box-sizing: border-box;
  cursor: pointer;
`;
