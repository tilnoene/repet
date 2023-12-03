import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Page from '../../components/Page';
import PrimaryText from '../../components/PrimaryText';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';

import { ContainerPage } from './styles';

import api from '../../services/api';
import { formatDate, formatTime } from '../../services/utils';

import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import Select from '../../components/Select';

const EditRecord = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(document.location.search);

  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(true);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const [isVaccine, setIsVaccine] = useState<boolean>(
    searchParams.get('is_vaccine') === 'true',
  );
  const [veterinarian, setVeterinarian] = useState<string>('');
  const [place, setPlace] = useState<string>('');

  const [petName, setPetName] = useState<string | undefined>('');

  const [loadingCreate, setLoadingCreate] = useState<boolean>(false);

  const [pets, setPets] = useState<Pet[]>([]);
  const [loadingPets, setLoadingPets] = useState<boolean>(true);

  const handleEditRecord = () => {
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
      toast.error('Selecione um pet para editar o registro.');
      return;
    }

    setLoadingCreate(true);

    api
      .put(`/records/${id}/`, {
        title: title,
        description: description,
        date: formattedDate.format('YYYY-MM-DD'),
        time: formattedTime.format('HH:mm:ss'),
        pet: pets.find(pet => pet.name === petName)?.id,
      })
      .then(() => {
        toast.success('Registro editado com sucesso.');
        navigate('/records');
        setLoadingCreate(false);
      })
      .catch((error: any) => {
        toast.error('Erro ao editar registro.');
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
    const formattedTime = dayjs(time, 'HH:mm');

    if (!formattedDate.isValid()) {
      toast.error('A data informada é inválida.');
      return;
    }

    if (time !== '' && !formattedTime.isValid()) {
      toast.error('O horário informado é inválido.');
      return;
    }

    if (veterinarian === '') {
      toast.error('O nome do veterinário é obrigatório.');
      return;
    }

    if (place === '') {
      toast.error('O nome do local é obrigatório.');
      return;
    }

    if (petName === '') {
      toast.error('Selecione um pet para editar o registro.');
      return;
    }

    setLoadingCreate(true);

    api
      .put(`/vaccines/${id}/`, {
        title: title,
        description: description,
        date: formattedDate.format('YYYY-MM-DD'),
        time: formattedTime.format('HH:mm:ss'),
        pet: pets.find(pet => pet.name === petName)?.id,
        veterinarian: veterinarian,
        place: place,
      })
      .then(() => {
        toast.success('Vacina editada com sucesso.');
        navigate('/records');
        setLoadingCreate(false);
      })
      .catch((error: any) => {
        toast.error('Erro ao editar vacina.');
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

        const selectedPet = response.data.find(
          (pet: Pet) => String(pet.id) === searchParams.get('pet_id'),
        );

        if (selectedPet) {
          setPetName(selectedPet.name);
        }
      })
      .catch((error: any) => {
        toast.error('Erro ao carregar os pets.');
        console.error(error);
        setLoadingPets(false);
      });
  };

  const getRecord = () => {
    setLoading(true);

    api
      .get(`/${isVaccine ? 'vaccines' : 'records'}/${id}/`)
      .then(response => {
        if (isVaccine) {
          const vaccine = response.data;

          setTitle(vaccine.record.title);
          setDescription(vaccine.record.description);
          setDate(
            dayjs(vaccine.record.date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
          );
          setTime(dayjs(vaccine.record.time, 'HH:mm:ss').format('HH:mm'));
          setPetName(vaccine.pet.name);

          setVeterinarian(vaccine.veterinarian);
          setPlace(vaccine.place);
        } else {
          const record = response.data;

          setTitle(record.title);
          setDescription(record.description);
          setDate(dayjs(record.date, 'YYYY-MM-DD').format('DD/MM/YYYY'));
          setTime(dayjs(record.time, 'HH:mm:ss').format('HH:mm'));
          setPetName(record.pet.name);
        }

        setLoading(false);
      })
      .catch(error => {
        toast.error('Erro ao carregar o registro.');
        console.error(error);
      });
  };

  useEffect(() => {
    getPets();
    getRecord();
  }, []);

  return (
    <Page loading={loading || loadingPets}>
      <PrimaryText>Editar {isVaccine ? 'Vacina' : 'Registro'}</PrimaryText>
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
              value={veterinarian}
              setValue={setVeterinarian}
              required
            />

            <Input label="Local" value={place} setValue={setPlace} required />
          </>
        )}

        <br />

        <Button
          name="ATUALIZAR"
          onClick={() =>
            isVaccine ? handleCreateVaccine() : handleEditRecord()
          }
          loading={loadingCreate}
        />

        <Button name="VOLTAR" onClick={() => navigate(-1)} variant="outlined" />
      </ContainerPage>
    </Page>
  );
};

export default EditRecord;
