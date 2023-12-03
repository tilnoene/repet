import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Page from '../../components/Page';
import CardPet from '../../components/CardPet';
import PrimaryText from '../../components/PrimaryText';
import Icon from '../../components/Icon';
import SecondaryText from '../../components/SecondaryText';

import { ContainerCards, ContainerTitle } from './styles';

import plusIcon from '../../assets/icons/plus.svg';

import api from '../../services/api';

const Pets = () => {
  const [pets, setPets] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getPets = () => {
    setLoading(true);

    api.get('/pets/').then(response => {
      setPets(response.data);
      setLoading(false);
    });
  };

  const removePetFromList = (id: number) => {
    setPets(pets.filter((pet: Pet) => pet.id !== id));
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <Page menuOption={2} loading={loading}>
      <ContainerTitle>
        <PrimaryText>Meus Pets</PrimaryText>

        <Link to="/create-pet">
          <Icon src={plusIcon} color="blue" size="20px" clickable />
        </Link>
      </ContainerTitle>

      <br />

      <ContainerCards>
        {pets.length > 0 ? pets.map((pet: Pet) => (
          <CardPet
            pet={pet}
            key={pet.id}
            removePetFromList={removePetFromList}
          />
        )) : <SecondaryText>Não há pets.</SecondaryText>}
      </ContainerCards>
    </Page>
  );
};

export default Pets;
