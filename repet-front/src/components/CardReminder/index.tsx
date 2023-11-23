import Card from '../Card';
import PrimaryText from '../PrimaryText';
import SecondaryText from '../SecondaryText';

import { BackroundColor, Content, Footer, Header } from './styles';

const CardReminder = ({ reminder, ...props }: { reminder: any }) => { // TODO: tipar
  return (
    <Card {...props}>
      <BackroundColor color={reminder.color} />

      <Content>
        <Header>
          <PrimaryText>{reminder.title}</PrimaryText>

          <PrimaryText fontSize="16px">{reminder.pet_name}</PrimaryText>
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
