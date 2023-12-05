import styled from 'styled-components';

import config from '../../config.json';

export const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 100%; // Ajuste conforme necessário
`;

type ProfileImageProps = {
  src: any;
};

export const ProfileImage = styled.div<ProfileImageProps>`
  background-image: url(${props => props.src});
  background-color: ${config.colors.gray};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  width: 60px; // Ajuste conforme necessário
  height: 60px; // Ajuste conforme necessário
  border-radius: 50%;
  margin-right: 20px;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileName = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

export const ProfileDescription = styled.div`
  font-size: 14px;
  color: #666;
`;
