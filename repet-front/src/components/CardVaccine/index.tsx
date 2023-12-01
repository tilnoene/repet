import Card from '../Card';
import PrimaryText from '../PrimaryText';
import SecondaryText from '../SecondaryText';
import Icon from '../Icon';
import Br from '../Br';

import { ContainerIcon, Content, Footer, Header, PetName } from './styles';

import pawIcon from '../../assets/icons/paw.svg';
import placeIcon from '../../assets/icons/place.svg';
import vaccineIcon from '../../assets/icons/vaccine.svg';

import dayjs from 'dayjs';

const CardVaccine = ({ vaccine, ...props }: { vaccine: Vaccine }) => {
  return (
    <Card {...props}>
      <Content>
        <Header>
          <PrimaryText>{vaccine.title}</PrimaryText>

          <PetName>
            <Icon src={pawIcon} color="black" size="18px" />
            <PrimaryText fontSize="16px">{vaccine.pet.name}</PrimaryText>
          </PetName>
        </Header>

        <SecondaryText>{vaccine.description}</SecondaryText>
        <Br />

        <ContainerIcon>
          <Icon src={vaccineIcon} color='secondaryText' size="16px" />
          <SecondaryText>{vaccine.veterinarian}</SecondaryText>
        </ContainerIcon>

        <ContainerIcon>
          <Icon src={placeIcon} color='secondaryText' size="16px" />
          <SecondaryText>{vaccine.place}</SecondaryText>
        </ContainerIcon>

        <Footer>
          <SecondaryText>{`${dayjs(vaccine.date).format('DD/MM/YYYY')} ${
            vaccine?.time &&
            `- ${dayjs(vaccine.time, 'HH:mm:ss').format('HH:mm')}`
          }`}</SecondaryText>
        </Footer>
      </Content>
    </Card>
  );
};

export default CardVaccine;
