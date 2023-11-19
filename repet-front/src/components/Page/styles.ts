import styled from 'styled-components';

import config from '../../config.json';

export const ContainerPage = styled.div`
  max-height: 100vh;
  background-color: ${ config.colors.background };
`;

type ContentProps = {
  centered: boolean;
}

export const Content = styled.div<ContentProps>`
  height: calc(100vh - 60px - 60px);
  margin-top: 60px;
  overflow: scroll;
  padding: 18px;
  overflow-x: hidden;
  display: ${ props => props.centered ? 'flex' : 'flow' };
  justify-content: center;
  align-items: center;
`;
