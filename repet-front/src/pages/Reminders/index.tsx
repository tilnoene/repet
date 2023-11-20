import { useState, useEffect } from 'react';

import Page from '../../components/Page';
import CardReminder from '../../components/CardReminder';

import { ContainerCards } from './styles';

import api from '../../services/api';
import PrimaryText from '../../components/PrimaryText';

import { Reminder } from '../../@types/Reminder';

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getReminders = () => {
    setLoading(true);

    api.get('/reminder').then((response: any) => {
      setReminders(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getReminders();
  }, []);

  return (
    <Page menuOption={1} loading={loading}>
      <div>
        <PrimaryText>Meus Lembretes</PrimaryText>
      </div>

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
