import styled from 'styled-components';

import config from '../../config.json';

export const ContainerPage = styled.div`
  width: 100%;
  height: 100%;
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
  height: 240px;
  z-index: 1;
`;

export const ProfileCard = styled.div`
  background: ${ config.colors.background };
  height: calc(100% - 240px + 24px);
  z-index: 2;
  border-radius: 24px 24px 0 0;
  margin-top: -24px;
  box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.25);
`;
