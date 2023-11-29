import Card from '../Card';
import PrimaryText from '../PrimaryText';
import SecondaryText from '../SecondaryText';
import Icon from '../Icon';

import { BackroundColor, Content, Footer, Header, PetName } from './styles';

import pawIcon from '../../assets/icons/paw.svg';

const CardReminder = ({ reminder, ...props }: { reminder: Reminder }) => {
  return (
    <Card {...props}>
      <BackroundColor color={reminder.color} />

      <Content>
        <Header>
          <PrimaryText>{reminder.title}</PrimaryText>

          <PetName>
            <Icon src={pawIcon} color="black" size="18px" />
            <PrimaryText fontSize="16px">{reminder.pet.name}</PrimaryText>
          </PetName>
        </Header>

        <SecondaryText>
          {reminder.description}
        </SecondaryText>

        <Footer>
          <SecondaryText>
            {reminder.date} - {reminder.time}
          </SecondaryText>
        </Footer>
      </Content>
    </Card>
  );
};

export default CardReminder;
