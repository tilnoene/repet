import styled from 'styled-components';

export const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 100%; // Ajuste conforme necessário
`;

export const ProfileImage = styled.img`
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
