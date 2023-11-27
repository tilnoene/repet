import styled from "styled-components";

import config from '../../config.json';

export const ContainerCard = styled.div`
  width: 100%;
  display: flex;
  border-radius: 6px;
  gap: 16px;
  padding: 16px;
  background-color: ${ config.colors.primaryBlue };
`;

type ImageProps = {
  src: any;
}

export const Image = styled.div<ImageProps>`
  background-image: url(${ props => props.src });
  background-color: ${ config.colors.gray };
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  width: 64px;
  height: 64px;
  border-radius: 4px;
`;

export const ContainerIcons = styled.div`
  display: flex;
  align-self: start;
  gap: 12px;
  margin-left: auto;
`;
