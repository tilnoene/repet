import styled from 'styled-components';

import config from '../../config.json';

export const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${ config.colors.primaryBlue };
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  color: white;
  position: absolute;
  top: 0;
`;
