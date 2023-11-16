import { Link } from "react-router-dom";

import PrimaryText from '../PrimaryText';
import Icon from '../Icon';

import { Container } from './styles';

import settingsIcon from '../../assets/icons/settings.svg';
// import dotsIcon from '../../assets/icons/dots.svg';

const Header = () => {
  return (
    <Container>
      {/* <Icon src={dotsIcon} /> */}

      <PrimaryText isWhite>rePET</PrimaryText>

      <Link to="/settings">
        <Icon src={settingsIcon} />
      </Link>
    </Container>
  );
}

export default Header;
