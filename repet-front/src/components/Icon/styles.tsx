import styled from "styled-components";

type ContainerIconProps = {
  disabled?: boolean;
  size: string;
  filter: string;
  clickable: boolean;
}

export const ContainerIcon = styled.img<ContainerIconProps>`
  filter: ${ props => props.filter };
  cursor: ${ props => props?.disabled ? 'not-allowed' : (props.clickable ? 'pointer' : 'default') };
  width: ${ props => props.size };
`;
