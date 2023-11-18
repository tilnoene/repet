import styled from 'styled-components';

import config from '../../config.json';

export const Container = styled.div`
  background: ${ config.colors.white };
  border-radius: 6px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.20);
`;
