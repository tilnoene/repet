import styled from 'styled-components';

import config from '../../config.json';

type TextProps = {
  isWhite: boolean;
  fontSize: string;
}

export const Text = styled.h2<TextProps>`
  color: ${ props => props.isWhite ? config.colors.white : config.colors.primaryText };
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  text-align: justify;
`;
