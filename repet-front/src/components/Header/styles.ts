import styled from 'styled-components';

import config from '../../config.json';

export const Container = styled.div`
  width: 100%;
  height: 60px;
  position: absolute;
  top: 0;
  background-color: ${config.colors.primaryBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const ForceMobile = styled.div`
  width: 100%;
  max-width: 1024px;
  padding: 0 20px;
  background-color: ${config.colors.primaryBlue};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;
