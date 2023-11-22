import Card from '../Card';
import PrimaryText from '../PrimaryText';
import SecondaryText from '../SecondaryText';

import { Content, Footer, Header } from './styles';

const CardRecord = ({ record, ...props }: { record: any }) => { // TODO: tipar
  return (
    <Card {...props}>
      <Content>
        <Header>
          <PrimaryText>{record.title}</PrimaryText>

          <PrimaryText fontSize="16px">{record.pet_name}</PrimaryText>
        </Header>

        <Footer>
          <SecondaryText>
            {record.date} - {record.time}
          </SecondaryText>
        </Footer>
      </Content>
    </Card>
  );
};

export default CardRecord;
