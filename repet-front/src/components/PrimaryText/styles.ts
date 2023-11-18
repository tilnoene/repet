import styled from 'styled-components';

import config from '../../config.json';

type TextProps = {
  isWhite: boolean;
  fontSize: string;
}

export const Text = styled.h2<TextProps>`
  color: ${ props => props.isWhite ? config.colors.white : config.colors.primaryText };
  font-size: ${ props => props.fontSize };
  font-weight: 600;
  margin: 0;
  padding: 0;
`;
