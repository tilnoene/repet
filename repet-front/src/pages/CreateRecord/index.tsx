import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Page from '../../components/Page';
import PrimaryText from '../../components/PrimaryText';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { ContainerPage } from './styles';

import api from '../../services/api';
import { formatDate, formatTime } from '../../services/utils';

import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import Checkbox from '../../components/Checkbox';

const CreateRecord = () => {
  const navigate = useNavigate();
  const { isVaccineUrl } = useParams();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const [isVaccine, setIsVaccine] = useState<boolean>(isVaccineUrl === 'true');
  const [veterinary, setVeterinary] = useState<string>('');
  const [place, setPlace] = useState<string>('');

  const [loadingCreate, setLoadingCreate] = useState<boolean>(false);

  const handleCreateRecord = () => {
    if (title === '') {
      toast.error('O título é obrigatório.');
      return;
    }

    const formattedDate = dayjs(date, 'DD/MM/YYYY');
    const formattedTime = dayjs(time, 'HH:mm:ss');

    if (!formattedDate.isValid()) {
      toast.error('A data informada é inválida.');
      return;
    }

    if (time !== '' && !formattedTime.isValid()) {
      toast.error('O horário informado é inválido.');
      return;
    }

    setLoadingCreate(true);

    api
      .post('/records/', {
        title: title,
        description: description,
        date: formattedDate.format('YYYY-MM-DD'),
        time: formattedTime.format('HH:mm:ss'),
        user: 1,
      })
      .then(() => {
        toast.success('Registro adicionado com sucesso.');
        navigate('/records');
        setLoadingCreate(false);
      })
      .catch((error: any) => {
        toast.error('Erro ao adicionar registro.');
        console.error(error);
        setLoadingCreate(false);
      });
  };

  const handleCreateVaccine = () => {
    if (title === '') {
      toast.error('O título é obrigatório.');
      return;
    }

    const formattedDate = dayjs(date, 'DD/MM/YYYY');
    const formattedTime = dayjs(time, 'HH:mm:ss');

    if (!formattedDate.isValid()) {
      toast.error('A data informada é inválida.');
      return;
    }

    if (time !== '' && !formattedTime.isValid()) {
      toast.error('O horário informado é inválido.');
      return;
    }

    if (veterinary === '') {
      toast.error('O nome do veterinário é obrigatório.');
      return;
    }

    if (place === '') {
      toast.error('O nome do local é obrigatório.');
      return;
    }

    setLoadingCreate(true);

    api
      .post('/vaccines/', {
        title: title,
        description: description,
        date: formattedDate.format('YYYY-MM-DD'),
        time: formattedTime.format('HH:mm:ss'),
        user: 1,
        veterinary: veterinary,
        place: place,
      })
      .then(() => {
        toast.success('Vacina adicionada com sucesso.');
        navigate('/records');
        setLoadingCreate(false);
      })
      .catch((error: any) => {
        toast.error('Erro ao adicionar vacina.');
        console.error(error);
        setLoadingCreate(false);
      });
  };

  return (
    <Page menuOption={2} loading={false}>
      <PrimaryText>Adicionar Registro</PrimaryText>
      <br />

      <ContainerPage>
        <Input label="Nome" value={title} setValue={setTitle} required />

        <Input
          label="Descrição"
          value={description}
          setValue={setDescription}
        />

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

        <Checkbox
          label="É uma vacina?"
          value={isVaccine}
          setValue={setIsVaccine}
        />

        {isVaccine && (
          <>
            <Input
              label="Veterinário(a)"
              value={veterinary}
              setValue={setVeterinary}
              required
            />

            <Input label="Local" value={place} setValue={setPlace} required />
          </>
        )}

        <br />

        <Button
          name="ADICIONAR"
          onClick={() =>
            isVaccine ? handleCreateVaccine() : handleCreateRecord()
          }
          loading={loadingCreate}
        />

        <Button
          name="VOLTAR"
          onClick={() => navigate(-1)}
          loading={loadingCreate}
          variant="outlined"
        />
      </ContainerPage>
    </Page>
  );
};

export default CreateRecord;
