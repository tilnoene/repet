import { Link } from 'react-router-dom';

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
        <Icon src={calendar_icon} color={option === 1 ? 'blue' : 'gray'} clickable />
      </Link>

      <Link to="/pets">
        <Icon src={paw_icon} color={option === 2 ? 'blue' : 'gray'} clickable />
      </Link>

      <Link to="/records">
        <Icon src={document_icon} color={option === 3 ? 'blue' : 'gray'} clickable />
      </Link>

      <Link to="/profile">
        <Icon src={profile_icon} color={option === 4 ? 'blue' : 'gray'} clickable />
      </Link>
    </Container>
  );
};

export default NavigationBar;
