import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

import Page from '../../components/Page';
import PrimaryText from '../../components/PrimaryText';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import SelectColor from '../../components/SelectColor';

import { ContainerPage } from './styles';

import api from '../../services/api';
import { formatDate, formatTime } from '../../services/utils';
import config from '../../config.json';

const EditReminder = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(true);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [color, setColor] = useState<string>(config.colors.primaryBlue);

  const [petName, setPetName] = useState<string>('');

  const [loadingEdit, setLoadingEdit] = useState<boolean>(false);

  const [pets, setPets] = useState<Pet[]>([]);
  const [loadingPets, setLoadingPets] = useState<boolean>(true);

  const handleEditReminder = () => {
    if (title === '') {
      toast.error('O título é obrigatório.');
      return;
    }

    const formattedDate = dayjs(date, 'DD/MM/YYYY');
    const formattedTime = dayjs(time, 'HH:mm');

    if (!formattedDate.isValid()) {
      toast.error('A data informada é inválida.');
      return;
    }

    if (time !== '' && !formattedTime.isValid()) {
      toast.error('O horário informado é inválido.');
      return;
    }

    if (petName === '') {
      toast.error('Selecione um pet para editar o lembrete.');
      return;
    }

    setLoadingEdit(true);

    api
      .put(`/reminders/${id}/`, {
        title: title,
        description: description,
        date: formattedDate.format('YYYY-MM-DD'),
        time: formattedTime.format('HH:mm:ss'),
        pet: pets.find(pet => pet.name === petName)?.id,
        color: color,
      })
      .then(() => {
        toast.success('Lembrete editado com sucesso.');
        navigate('/');
        setLoadingEdit(false);
      })
      .catch((error: any) => {
        toast.error('Erro ao editar lembrete.');
        console.error(error);
        setLoadingEdit(false);
      });
  };

  const getPets = () => {
    setLoadingPets(true);

    api
      .get('/pets/')
      .then(response => {
        setPets(response.data);
        setLoadingPets(false);
      })
      .catch((error: any) => {
        toast.error('Erro ao carregar os pets.');
        console.error(error);
        setLoadingPets(false);
      });
  };

  const getReminder = () => {
    setLoading(true);

    api
      .get(`/reminders/${id}/`)
      .then(response => {
        const reminder = response.data;

        setTitle(reminder.title);
        setDescription(reminder.description);
        setColor(reminder.color);
        setDate(dayjs(reminder.date, 'YYYY-MM-DD').format('DD/MM/YYYY'));
        setTime(dayjs(reminder.time, 'HH:mm:ss').format('HH:mm'));
        setPetName(reminder.pet.name);

        setLoading(false);
      })
      .catch(error => {
        toast.error('Erro ao carregar o registro.');
        console.error(error);
      });
  };

  useEffect(() => {
    getPets();
    getReminder();
  }, []);

  return (
    <Page loading={loading || loadingPets}>
      <PrimaryText>Editar Lembrete</PrimaryText>
      <br />

      <ContainerPage>
        <Input label="Título" value={title} setValue={setTitle} required />

        <Input
          label="Descrição"
          value={description}
          setValue={setDescription}
        />

        <Select
          label="Pet"
          options={pets.map(pet => pet.name)}
          required
          defaultValue={petName}
          setValue={setPetName}
        />

        <SelectColor label="Cor" required value={color} setValue={setColor} />

        <Input
          label="Data"
          value={date}
          setValue={(value: string) => {
            setDate(formatDate(value));
          }}
          placeholder="DD/MM/AAAA"
          required
        />

        <Input
          label="Horário"
          value={time}
          setValue={(value: string) => {
            setTime(formatTime(value));
          }}
          placeholder="HH:MM"
        />

        <Button
          name="ATUALIZAR"
          onClick={() => handleEditReminder()}
          loading={loadingEdit}
        />

        <Button name="VOLTAR" onClick={() => navigate(-1)} variant="outlined" />
      </ContainerPage>
    </Page>
  );
};

export default EditReminder;
