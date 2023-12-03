import styled from 'styled-components';

export const AppContainer = styled.div`
  text-align: center;
  background-color: #fff;
  color: #333;
  font-family: 'Lexend', sans-serif;
  min-height: 100vh;
`;

export const AppHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
`;

export const BackButton = styled.img`
  position: absolute;
  left: 40%;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const HeaderTitle = styled.h1`
  font-size: 1.5em;
  margin: 0;
  font-family: 'Lexend', sans-serif;
`;

export const MainContent = styled.main`
  padding: 20px;
`;

export const PetImage = styled.img`
  max-width: 100%;
  height: auto;
`;

export const AppFooter = styled.footer`
  padding: 20px;
  background-color: #fff;
  text-align: center;
`;

export const SocialMediaText = styled.p`
  font-weight: bold;
  font-family: 'Lexend', sans-serif;
  margin: 0 0 10px 0;
`;

export const SocialLink = styled.a`
  color: #333;
  margin: 0 10px;
  font-size: 24px;
`;

export const StoreBadge = styled.img`
  height: auto;
  width: 300px;
  margin: 5px;
`;
