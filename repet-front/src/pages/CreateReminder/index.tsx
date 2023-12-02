import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const CreateReminder = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [color, setColor] = useState<string>(config.colors.primaryBlue);

  const [petName, setPetName] = useState<string>('');

  const [loadingCreate, setLoadingCreate] = useState<boolean>(false);

  const [pets, setPets] = useState<Pet[]>([]);
  const [loadingPets, setLoadingPets] = useState<boolean>(true);

  const handleCreateReminder = () => {
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
      toast.error('Selecione um pet para adicionar o lembrete.');
      return;
    }

    setLoadingCreate(true);

    api
      .post('/reminders/', {
        title: title,
        description: description,
        date: formattedDate.format('YYYY-MM-DD'),
        time: formattedTime.format('HH:mm:ss'),
        pet: pets.find(pet => pet.name === petName)?.id,
        color: color,
      })
      .then(() => {
        toast.success('Lembrete adicionado com sucesso.');
        navigate('/');
        setLoadingCreate(false);
      })
      .catch((error: any) => {
        toast.error('Erro ao adicionar lembrete.');
        console.error(error);
        setLoadingCreate(false);
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

  useEffect(() => {
    getPets();
  }, []);

  return (
    <Page loading={loadingPets}>
      <PrimaryText>Adicionar Lembrete</PrimaryText>
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
          name="ADICIONAR"
          onClick={() => handleCreateReminder()}
          loading={loadingCreate}
        />

        <Button name="VOLTAR" onClick={() => navigate(-1)} variant="outlined" />
      </ContainerPage>
    </Page>
  );
};

export default CreateReminder;
