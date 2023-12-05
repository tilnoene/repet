import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Page from '../../components/Page';
import CardReminder from '../../components/CardReminder';
import PrimaryText from '../../components/PrimaryText';
import Icon from '../../components/Icon';
import SecondaryText from '../../components/SecondaryText';
import Br from '../../components/Br';

import { ContainerCards, ContainerTitle } from './styles';

import plusIcon from '../../assets/icons/plus.svg';

import api from '../../services/api';

import { toast } from 'react-toastify';
import dayjs from 'dayjs';

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

  const checkServiceWorkerAvailability = () => {
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

    if (permission !== 'granted') {
      throw new Error('Permission not granted for Notification');
    }
  };

  // TODO: ativar notificações só na tela de configurações
  const testNotification = async () => {
    try {
      checkServiceWorkerAvailability();
      await requestNotificationPermission();
      await registerServiceWorker();
    } catch (error) {
      console.error(error);
    }
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
<<<<<<< HEAD
        {
          <>
            <SecondaryText>Lembretes Passados</SecondaryText>

            {reminders.filter(reminder => {
              const time = reminder.time ? reminder.time : '00:00:00';
              const date = dayjs(
                `${reminder.date} ${time}`,
                'YYYY-MM-DD HH:mm:ss',
              );

              return date <= dayjs();
            }).length > 0 ? (
              reminders
                .filter(reminder => {
                  const time = reminder.time ? reminder.time : '00:00:00';
                  const date = dayjs(
                    `${reminder.date} ${time}`,
                    'YYYY-MM-DD HH:mm:ss',
                  );

                  return date <= dayjs();
                })
                .map(reminder => (
                  <CardReminder
                    reminder={reminder}
                    key={reminder.id}
                    removeReminderFromList={removeReminderFromList}
                  />
                ))
            ) : (
              <SecondaryText italic>Não há lembretes passados.</SecondaryText>
            )}

            <Br />

            <SecondaryText>Lembretes Futuros</SecondaryText>

            {reminders.filter(reminder => {
              const time = reminder.time ? reminder.time : '00:00:00';
              const date = dayjs(
                `${reminder.date} ${time}`,
                'YYYY-MM-DD HH:mm:ss',
              );

              return date > dayjs();
            }).length > 0 ? (
              reminders
                .filter(reminder => {
                  const time = reminder.time ? reminder.time : '00:00:00';
                  const date = dayjs(
                    `${reminder.date} ${time}`,
                    'YYYY-MM-DD HH:mm:ss',
                  );

                  return date > dayjs();
                })
                .map(reminder => (
                  <CardReminder
                    reminder={reminder}
                    key={reminder.id}
                    removeReminderFromList={removeReminderFromList}
                  />
                ))
            ) : (
              <SecondaryText italic>Não há lembretes futuros.</SecondaryText>
            )}
          </>
        }
=======
        {reminders.length > 0 ? (
          <>
            {reminders
              .filter(reminder => {
                const date = reminder.date;
                const time = reminder.time ? reminder.time : '00:00:00';

                return (
                  dayjs(`${date} ${time}`, 'DD/MM/YYYY HH:mm:ss') >= dayjs()
                );
              })
              .map(reminder => (
                <CardReminder
                  reminder={reminder}
                  key={reminder.id}
                  removeReminderFromList={removeReminderFromList}
                />
              ))}

            <p>separador</p>
            {reminders
              .filter(reminder => {
                const date = reminder.date;
                const time = reminder.time ? reminder.time : '00:00:00';

                return (
                  dayjs(`${date} ${time}`, 'DD/MM/YYYY HH:mm:ss') < dayjs()
                );
              })
              .map(reminder => (
                <CardReminder
                  reminder={reminder}
                  key={reminder.id}
                  removeReminderFromList={removeReminderFromList}
                />
              ))}
          </>
        ) : (
          <SecondaryText>Não há lembretes.</SecondaryText>
        )}
>>>>>>> main
      </ContainerCards>
    </Page>
  );
};

export default Reminders;
