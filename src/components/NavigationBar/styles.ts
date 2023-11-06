import styled from 'styled-components';

import config from '../../config.json';

export const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${ config.colors.white };
  box-shadow: 0px -1px 7px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  padding: 0 20px; // 9px
  justify-content: space-around;
  align-items: center;
  color: white;

  position: absolute;
  bottom: 0;
`;
