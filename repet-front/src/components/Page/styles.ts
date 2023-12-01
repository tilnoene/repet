import styled from 'styled-components';

import config from '../../config.json';

export const ContainerPage = styled.div`
  width: 100%;
  max-height: 100vh;
  background-color: ${ config.colors.background };
`;

type ContentProps = {
  centered: boolean;
  padding: boolean;
}

export const Content = styled.div<ContentProps>`
  width: 100%;
  height: calc(100vh - 60px - 60px);
  margin-top: 60px;
  overflow: scroll;
  padding: ${ props => props.padding ? '18px' : '0' };
  overflow-x: hidden;
  display: ${ props => props.centered ? 'flex' : 'block' };
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
