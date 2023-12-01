import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Page from '../../components/Page';
import CardReminder from '../../components/CardReminder';
import PrimaryText from '../../components/PrimaryText';
import Icon from '../../components/Icon';
import SecondaryText from '../../components/SecondaryText';

import { ContainerCards, ContainerTitle } from './styles';

import plusIcon from '../../assets/icons/plus.svg';

import api from '../../services/api';

import { toast } from 'react-toastify';

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getReminders = () => {
    setLoading(true);

    api
      .get('/reminders/')
      .then((response: any) => {
        setReminders(response.data);
        setLoading(false);
      })
      .catch((error: any) => {
        toast.error('Erro ao carregar os lembretes');
        console.error(error);
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
        {reminders.length > 0 ? (
          reminders.map(reminder => (
            <CardReminder reminder={reminder} key={reminder.id} />
          ))
        ) : (
          <SecondaryText>Não há lembretes.</SecondaryText>
        )}
      </ContainerCards>
    </Page>
  );
};

export default Reminders;
