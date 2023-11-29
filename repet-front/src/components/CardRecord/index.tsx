import Card from '../Card';
import PrimaryText from '../PrimaryText';
import SecondaryText from '../SecondaryText';
import Icon from '../Icon';

import { Content, Footer, Header, PetName } from './styles';

import pawIcon from '../../assets/icons/paw.svg';

const CardRecord = ({ record, ...props }: { record: PetRecord }) => {
  return (
    <Card {...props}>
      <Content>
        <Header>
          <PrimaryText>{record.title}</PrimaryText>

          <PetName>
            <Icon src={pawIcon} color="black" size="18px"/>
            <PrimaryText fontSize="16px">{record.pet.name}</PrimaryText>
          </PetName>
        </Header>

        <SecondaryText>
          {record.description}
        </SecondaryText>

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
