import { useNavigate } from 'react-router-dom';

import PrimaryText from '../PrimaryText';
import Icon from '../Icon';

import { Container } from './styles';

import settingsIcon from '../../assets/icons/gear.svg';
import questionMarkIcon from '../../assets/icons/question.svg';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Icon
        src={questionMarkIcon}
        color="white"
        clickable
        size="32px"
        onClick={() => navigate('/about')}
      />

      <PrimaryText isWhite>rePET</PrimaryText>

      <Icon
        src={settingsIcon}
        color="white"
        clickable
        size="42px"
        onClick={() => navigate('/settings')}
      />
    </Container>
  );
};

export default Header;
