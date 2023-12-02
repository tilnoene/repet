import { useState } from 'react';

import Card from '../Card';
import PrimaryText from '../PrimaryText';
import SecondaryText from '../SecondaryText';
import Icon from '../Icon';
import Button from '../Button';
import Modal from '../Modal';
import FloatingOptions from '../FloatingOptions';

import { BackroundColor, Content, Footer, Header, PetName } from './styles';

import pawIcon from '../../assets/icons/paw.svg';
import dotsIcon from '../../assets/icons/dots-3-horizontal.svg';

import { toast } from 'react-toastify';
import config from '../../config.json';
import api from '../../services/api';

import dayjs from 'dayjs';

const CardReminder = ({
  reminder,
  removeReminderFromList,
  ...props
}: {
  reminder: Reminder;
  removeReminderFromList: any;
}) => {
  const [openModalOptions, setOpenModalOptions] = useState<boolean>(false);
  const [openModalCheck, setOpenModalCheck] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const handleOpenModalOptions = () => {
    setOpenModalOptions(true);
  };

  const handleCloseModalCheck = () => {
    setOpenModalCheck(false);
  };

  const handleOpenModalCheck = () => {
    handleCloseModalOptions();
    setOpenModalCheck(true);
  };

  const handleCloseModalOptions = () => {
    setOpenModalOptions(false);
  };

  const handleOpenModalDelete = () => {
    handleCloseModalOptions();
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleDelete = async () => {
    await api
      .delete(`/reminders/${reminder.id}/`)
      .then(() => {
        toast.success(`Lembrete apagado com sucesso.`);
        removeReminderFromList(reminder.id);
        handleCloseModalDelete();
      })
      .catch(error => {
        toast.error(`Erro ao apagar o lembrete.`);
        console.error(error);
      });

    setLoading(false);
  };

  const handleCheck = async () => {
    try {
      setLoading(true);

      await api.delete(`/reminders/${reminder.id}/`).catch(error => {
        throw new Error(error);
      });

      await api
        .post('/records/', {
          title: reminder.title,
          description: reminder.description,
          date: reminder.date,
          time: reminder.time,
          pet: reminder.pet.id,
        })
        .then(() => {
          toast.success('Lembrete marcado como concluído.');
          removeReminderFromList(reminder.id);
        })
        .catch(error => {
          throw new Error(error);
        });
    } catch (e) {
      toast.error('Ocorreu um erro ao marcar o lembrete como concluído.');
      console.error(e);
    } finally {
      setLoading(false);
      handleCloseModalOptions();
    }
  };

  return (
    <Card {...props}>
      <BackroundColor
        color={reminder?.color ? reminder.color : config.colors.primaryBlue}
      />

      <Content>
        <Header>
          <PrimaryText>{reminder.title}</PrimaryText>

          <div>
            <Icon
              src={dotsIcon}
              color="primaryText"
              size="32px"
              onClick={() => handleOpenModalOptions()}
            />

            {openModalOptions && (
              <FloatingOptions
                loading={loading}
                editUrl={`/edit-reminder/${reminder.id}`}
                handleCloseModalOptions={handleCloseModalOptions}
                handleOpenModalDelete={handleOpenModalDelete}
                handleOpenModalCheck={handleOpenModalCheck}
              />
            )}
          </div>
        </Header>

        <SecondaryText>{reminder.description}</SecondaryText>

        <Footer>
          <PetName>
            <Icon src={pawIcon} color="black" size="16px" />
            <PrimaryText fontSize="15px">{reminder.pet.name}</PrimaryText>
          </PetName>

          <SecondaryText>{`${dayjs(reminder.date).format('DD/MM/YYYY')} ${
            reminder?.time &&
            `- ${dayjs(reminder.time, 'HH:mm:ss').format('HH:mm')}`
          }`}</SecondaryText>
        </Footer>
      </Content>

      {openModalCheck && (
        <Modal
          title={`Deseja marcar o lembrete como concluído?`}
          handleClose={handleCloseModalCheck}
        >
          <Button
            name="CONFIRMAR"
            onClick={() => handleCheck()}
            loading={loading}
            color="green"
          />
        </Modal>
      )}

      {openModalDelete && (
        <Modal
          title={`Deseja apagar o lembrete?`}
          handleClose={handleCloseModalDelete}
        >
          <Button
            name="APAGAR"
            onClick={() => handleDelete()}
            loading={loading}
            color="red"
          />
        </Modal>
      )}
    </Card>
  );
};

export default CardReminder;
