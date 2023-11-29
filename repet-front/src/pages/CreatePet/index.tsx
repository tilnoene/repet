import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Page from '../../components/Page';
import PrimaryText from '../../components/PrimaryText';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';

import { ContainerPage } from './styles';

import api from '../../services/api';
import {
  formatDate,
  formatWeight,
  petGenderOptions,
  petTypeOptions,
} from '../../services/utils';

import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const CreatePet = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [type, setType] = useState<any>('');
  const [breed, setBreed] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  const [loadingCreate, setLoadingCreate] = useState<boolean>(false);

  const handleCreatePet = () => {
    if (name === '') {
      toast.error('O nome é obrigatório.');
      return;
    }

    if (type === '') {
      toast.error('O tipo é obrigatório.');
      return;
    }

    if (gender === '') {
      toast.error('O gênero é obrigatório.');
      return;
    }

    const date = dayjs(birthdate, 'DD/MM/YYYY');

    if (!date.isValid()) {
      toast.error('A data de nascimento informada é inválida.');
      return;
    }

    setLoadingCreate(true);

    api
      .post('/pets/', {
        name: name,
        type: type,
        breed: breed,
        gender: gender,
        birthdate: date.format('YYYY-MM-DD'),
        weight: weight,
        user: 1,
      })
      .then(() => {
        toast.success('Pet adicionado com sucesso.');
        navigate('/pets');
        setLoadingCreate(false);
      })
      .catch((error: any) => {
        toast.error('Erro ao adicionar pet.');
        console.error(error);
        setLoadingCreate(false);
      });
  };

  return (
    <Page menuOption={2} loading={false}>
      <PrimaryText>Adicionar Pet</PrimaryText>
      <br />

      <ContainerPage>
        <Input label="Nome" value={name} setValue={setName} required />

        <Select
          label="Tipo"
          setValue={setType}
          options={petTypeOptions}
          required
        />

        <Input label="Raça" value={breed} setValue={setBreed} />

        <Select
          label="Gênero"
          setValue={setGender}
          options={petGenderOptions}
          required
        />

        <Input
          label="Data de Nascimento"
          value={birthdate}
          setValue={(value: string) => {
            setBirthdate(formatDate(value));
          }}
          placeholder="DD/MM/AAAA"
          required
        />

        <Input
          label="Peso"
          value={weight}
          setValue={(value: string) => {
            setWeight(formatWeight(value));
          }}
          placeholder="3 kg"
        />

        <br />

        <Button
          name="ADICIONAR"
          onClick={() => handleCreatePet()}
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

export default CreatePet;
