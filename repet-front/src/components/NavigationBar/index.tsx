import { Link } from "react-router-dom";

import Icon from '../Icon';

import calendar_icon from '../../assets/icons/calendar.svg';
import paw_icon from '../../assets/icons/paw.svg';
import document_icon from '../../assets/icons/document.svg';
import profile_icon from '../../assets/icons/profile.svg';

import { Container } from './styles';

const NavigationBar = ({ option = 0 }: { option?: number }) => {
  return (
    <Container>
      <Link to="/">
        <Icon src={calendar_icon} isBlue={option === 1} />
      </Link>

      <Link to="/pets">
        <Icon src={paw_icon} isBlue={option === 2} />
      </Link>

      <Link to="/records">
        <Icon src={document_icon} isBlue={option === 3} />
      </Link>

      <Link to="/profile">
        <Icon src={profile_icon} isBlue={option === 4} />
      </Link>
    </Container>
  );
};

export default NavigationBar;
