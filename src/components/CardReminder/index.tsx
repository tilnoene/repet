import Card from '../Card';
import PrimaryText from '../PrimaryText';
import SecondaryText from '../SecondaryText';

import { BackroundColor, Content, Footer, Header } from './styles';

const CardReminder = ({ reminder, ...props }: { reminder: any }) => {
  return (
    <Card {...props}>
      <BackroundColor color={reminder.color} />

      <Content>
        <Header>
          <PrimaryText>{reminder.title}</PrimaryText>

          <PrimaryText fontSize="16px">{reminder.pet_name}</PrimaryText>
        </Header>

        <div>
          {reminder.attributes.map((attribute: string, index: number) => (
            <SecondaryText key={index}>• {attribute}</SecondaryText>
          ))}
        </div>

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
