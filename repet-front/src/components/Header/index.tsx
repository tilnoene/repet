import { Link } from 'react-router-dom';

import PrimaryText from '../PrimaryText';
import Icon from '../Icon';

import { Container } from './styles';

import settingsIcon from '../../assets/icons/gear_outlined.svg';
// import dotsIcon from '../../assets/icons/dots.svg';

const Header = () => {
  return (
    <Container>
      {/* <Icon src={dotsIcon} color="white" /> */}

      <PrimaryText isWhite>rePET</PrimaryText>

      <Link to="/settings">
        <Icon src={settingsIcon} color="white" clickable />
      </Link>
    </Container>
  );
};

export default Header;
