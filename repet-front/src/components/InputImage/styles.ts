import styled from 'styled-components';

import config from '../../config.json';

export const ContainerInputImage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
`;

export const ContainerIcon = styled.label`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const InputImageStyle = styled.input`
  display: none;
`;

export const ContainerImage = styled.div`
  display: flex;
  gap: 12px;
  position: relative;
  margin-top: 4px;
`;

export const EditIcon = styled.label`
  display: flex;
  position: absolute;
  margin: -21px 0 0 calc(128px - 21px);
`;

export const BackgroundSquare = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  background-color: ${config.colors.background};
  border-radius: 12px;
`;

type ImageProps = {
  src: string;
};

export const Image = styled.div<ImageProps>`
  width: 128px;
  height: 128px;
  background-image: url(${props => props.src});
  background-color: ${config.colors.gray};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  border-radius: 18px;
`;
