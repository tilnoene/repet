import styled from 'styled-components';

import config from '../../config.json';

type ContainerProps = {
  borderRadius: string;
};

export const Container = styled.div<ContainerProps>`
  background: ${config.colors.white};
  border-radius: ${props => props.borderRadius};
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.2);
`;
