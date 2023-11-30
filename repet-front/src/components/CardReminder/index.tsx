import Card from '../Card';
import PrimaryText from '../PrimaryText';
import SecondaryText from '../SecondaryText';
import Icon from '../Icon';

import { BackroundColor, Content, Footer, Header, PetName } from './styles';

import pawIcon from '../../assets/icons/paw.svg';

import config from '../../config.json';

import dayjs from 'dayjs';

const CardReminder = ({ reminder, ...props }: { reminder: Reminder }) => {
  return (
    <Card {...props}>
      <BackroundColor
        color={reminder?.color ? reminder.color : config.colors.primaryBlue}
      />

      <Content>
        <Header>
          <PrimaryText>{reminder.title}</PrimaryText>

          <PetName>
            <Icon src={pawIcon} color="black" size="18px" />
            <PrimaryText fontSize="16px">{reminder.pet.name}</PrimaryText>
          </PetName>
        </Header>

        <SecondaryText>{reminder.description}</SecondaryText>

        <Footer>
          <SecondaryText>{`${dayjs(reminder.date).format('DD/MM/YYYY')} ${
            reminder?.time &&
            `- ${dayjs(reminder.time, 'HH:mm:ss').format('HH:mm')}`
          }`}</SecondaryText>
        </Footer>
      </Content>
    </Card>
  );
};

export default CardReminder;
