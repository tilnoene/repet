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

  const getReminders = async () => {
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

  const removeReminderFromList = (id: number) => {
    setReminders(reminders.filter((reminder: Reminder) => reminder.id !== id));
  };

  const check = () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('No Service Worker support!');
    }
    if (!('PushManager' in window)) {
      throw new Error('No Push API Support!');
    }
  };

  const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register(
      './service.js',
    );
    return swRegistration;
  };

  const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.
    if (permission !== 'granted') {
      throw new Error('Permission not granted for Notification');
    }
  };

  const showLocalNotification = (
    title: any,
    body: any,
    swRegistration: any,
  ) => {
    const options = {
      body,
      // TODO: here you can add more properties like icon, image, vibrate, etc.
    };
    swRegistration.showNotification(title, options);
  };

  // TODO: ativar notificações só na tela de configurações
  const testNotification = async () => {
    check();
    const swRegistration = await registerServiceWorker();
    const permission = await requestNotificationPermission();

    // try {
    //   console.log('tentando enviar notificação');

    //   showLocalNotification(
    //     'This is title',
    //     'this is the message',
    //     swRegistration,
    //   );
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    getReminders();

    try {
      testNotification();
    } catch (error) {
      console.error(error);
    }
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
            <CardReminder
              reminder={reminder}
              key={reminder.id}
              removeReminderFromList={removeReminderFromList}
            />
          ))
        ) : (
          <SecondaryText>Não há lembretes.</SecondaryText>
        )}
      </ContainerCards>
    </Page>
  );
};

export default Reminders;
