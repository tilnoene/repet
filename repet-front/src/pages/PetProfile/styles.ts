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
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardHeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CardHeaderIcons = styled.div`
  display: flex;
  gap: 12px;
`

export const CardContent = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 22px;

`

export const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CardTopic = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;
