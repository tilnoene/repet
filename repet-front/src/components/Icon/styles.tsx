import styled from "styled-components";

type ContainerIconProps = {
  disabled?: boolean;
  size: string;
  filter: string;
}

export const ContainerIcon = styled.img<ContainerIconProps>`
  filter: ${ props => props.filter };
  cursor: ${ props => props?.disabled ? 'not-allowed' : 'pointer' };
  width: ${ props => props.size };
`;
