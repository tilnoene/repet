import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Page from '../../components/Page';
import CardReminder from '../../components/CardReminder';
import PrimaryText from '../../components/PrimaryText';
import Icon from '../../components/Icon';

import { ContainerCards, ContainerTitle } from './styles';

import plusIcon from '../../assets/icons/plus.svg';

import api from '../../services/api';

import { Reminder } from '../../@types/Reminder';

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getReminders = () => {
    setLoading(true);

    api.get('/reminders').then((response: any) => {
      setReminders(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getReminders();
  }, []);

  return (
    <Page menuOption={1} loading={loading}>
      <ContainerTitle>
        <PrimaryText>Meus Lembretes</PrimaryText>

        <Link to="/create-reminder">
          <Icon src={plusIcon} color="blue" size="20px" clickable />
        </Link>
      </ContainerTitle>

      <br />

      <ContainerCards>
        {reminders.map(reminder => (
          <CardReminder reminder={reminder} key={reminder.id} />
        ))}
      </ContainerCards>
    </Page>
  );
};

export default Reminders;
