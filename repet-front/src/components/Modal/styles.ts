import styled from 'styled-components';

import config from '../../config.json';

export const Container = styled.div`
  background: ${config.colors.black};
  opacity: 0.5;
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

export const ContainerModal = styled.div`
  background: ${config.colors.background};
  opacity: 1;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  width: 80%;
  height: min-content;
  z-index: 8;
  border-radius: 8px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HeaderModal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 16px;
`;
