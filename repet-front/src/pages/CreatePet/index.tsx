import { useState } from 'react';

import Page from '../../components/Page';
import PrimaryText from '../../components/PrimaryText';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { ContainerPage } from './styles';
import Select from '../../components/Select';

import api from '../../services/api';
import { petGenderOptions, petTypeOptions } from '../../services/utils';
import { toast } from 'react-toastify';

const CreatePet = () => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<any>('');
  const [breed, setBreed] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  const [loadingCreate, setLoadingCreate] = useState<boolean>(false);

  const handleCreatePet = () => {
    if (name === '') {
      toast.error('O nome é obrigatório!');
      return;
    }

    if (type === '') {
      toast.error('O tipo é obrigatório!');
      return;
    }

    if (gender === '') {
      toast.error('O gênero é obrigatório!');
      return;
    }

    // TODO: validar data pra ver se é antes de hoje

    setLoadingCreate(true);

    api.post('/pets/', {
      name: name,
      type: type,
      breed: breed,
      gender: gender,
      birthdate: birthdate, // TODO: tratar para data em ingles com dayjs
      weight: weight,
    });

    setLoadingCreate(false);
  }

  return (
    <Page menuOption={2} loading={false}>
      <PrimaryText>Cadastrar Pet</PrimaryText>
      <br />

      <ContainerPage>
        <Input label="Nome" value={name} setValue={setName} />

        <Select
          label='Tipo'
          setValue={setType}
          options={petTypeOptions}
        />

        <Input label="Raça" value={breed} setValue={setBreed} />

        <Select
          label='Gênero' // TODO: conferir nomenclatura
          setValue={setGender}
          options={petGenderOptions}
        />

        {/* TODO: colocar opcional */}
        {/* TODO: regex */}
        <Input label="Data de Nascimento" value={birthdate} setValue={setBirthdate} placeholder='DD/MM/AAAA' />

        {/* TODO: colocar opcional */}
        {/* TODO: only number, colocando kg na frente */}
        <Input label="Peso" value={weight} setValue={setWeight} placeholder='3 kg' />

        <br />

        <Button name="CADASTRAR PET" onClick={() => handleCreatePet()} loading={loadingCreate} />
      </ContainerPage>
    </Page>
  );
};

export default CreatePet;
