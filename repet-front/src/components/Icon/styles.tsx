import styled from "styled-components";

type ContainerIconProps = {
  isBlue?: boolean;
}

export const ContainerIcon = styled.img<ContainerIconProps>`
  filter: ${ props => props?.isBlue ?
    "invert(36%) sepia(64%) saturate(3016%) hue-rotate(191deg) brightness(105%) contrast(105%)"
    :
    "filter: invert(97%) sepia(3%) saturate(845%) hue-rotate(177deg) brightness(90%) contrast(97%)"
  };
  width: 36px;
`;
