import styled from 'styled-components';

import config from '../../config.json';

export const ContainerPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const ContainerCard = styled.div`
  width: 100%;
  background: ${ config.colors.white };
  padding: 18px;
  border-radius: 50px; // Borda arredondada
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InfoGroup = styled.div``;
