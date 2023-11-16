import styled from 'styled-components';

import config from '../../config.json';

export const ContainerPage = styled.div`
  max-height: 100vh;
  background-color: ${ config.colors.background };
`;

export const Content = styled.div`
  height: calc(100vh - 60px - 60px);
  margin-top: 60px;
  overflow: scroll;
  padding: 18px;
`;
