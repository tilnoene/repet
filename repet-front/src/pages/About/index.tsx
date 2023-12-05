import React from 'react';
import { useNavigate } from 'react-router';
import { FaInstagram, FaGithub } from 'react-icons/fa';

import textImg from '../../assets/images/about_us_text.png';
import downloadImg from '../../assets/images/about_us_download.png';
import backArrowImg from '../../assets/images/about_us_arrow.png';

import {
  AppContainer,
  AppHeader,
  BackButton,
  HeaderTitle,
  MainContent,
  PetImage,
  AppFooter,
  SocialMediaText,
  SocialLink,
  StoreBadge,
} from './styles';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppHeader>
      <BackButton
        src={backArrowImg}
        alt="Voltar"
        onClick={() => navigate(-1)}
      />
      <HeaderTitle>Sobre Nós</HeaderTitle>
    </AppHeader>
  );
};

const MainContentComponent: React.FC = () => (
  <MainContent>
    <PetImage src={textImg} alt="Pet" />
  </MainContent>
);

const Footer: React.FC = () => (
  <AppFooter>
    <SocialMediaText>Nos acompanhe nas redes sociais:</SocialMediaText>
    <SocialLink
      href="https://github.com/tilnoene/repet"
      target="_blank"
      rel="noreferrer"
    >
      <FaGithub size={24} />
    </SocialLink>
    <FaInstagram size={24} style={{ cursor: 'default' }} />{' '}
    <div>
      <StoreBadge
        src={downloadImg}
        alt="Disponível no Google Play e na Apple Store"
      />
    </div>
  </AppFooter>
);

const App: React.FC = () => (
  <AppContainer>
    <Header />
    <MainContentComponent />
    <Footer />
  </AppContainer>
);

export default App;
