import React from 'react';
import { FaInstagram, FaGithub } from 'react-icons/fa';

import textImg from '../../assets/images/about_text.png';
import downloadImg from '../../assets/images/about_download.png';
import backArrowImg from '../../assets/images/about_arrow.png';

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

const Header: React.FC = () => (
  <AppHeader>
    <BackButton src={backArrowImg} alt="Voltar" />
    <HeaderTitle>Sobre Nós</HeaderTitle>
  </AppHeader>
);

const MainContentComponent: React.FC = () => (
  <MainContent>
    <PetImage src={textImg} alt="Pet" />
  </MainContent>
);

const Footer: React.FC = () => (
  <AppFooter>
    <SocialMediaText>Nos acompanhe nas redes sociais:</SocialMediaText>
    <SocialLink href="https://github.com/tilnoene/repet">
      <FaGithub size={24} />
    </SocialLink>
    <FaInstagram size={24} style={{ cursor: 'default' }} />{' '}
    <div>
      <StoreBadge src={downloadImg} alt="Disponível no Google Play" />
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
