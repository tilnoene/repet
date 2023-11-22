import styled from 'styled-components';

import config from '../../config.json';

export const Text = styled.h2`
  color: ${ config.colors.secondaryText };
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  text-align: justify;
`;
