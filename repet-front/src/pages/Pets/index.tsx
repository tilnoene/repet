import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Page from '../../components/Page';
import CardPet from '../../components/CardPet';
import PrimaryText from '../../components/PrimaryText';
import Icon from '../../components/Icon';

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

  useEffect(() => {
    getPets();
  }, []);

  return (
    <Page menuOption={2} loading={loading}>
      <ContainerTitle>
        <PrimaryText>Meus Pets</PrimaryText>

        <Link to="/create-pet">
          <Icon src={plusIcon} color='blue' size="20px" clickable />
        </Link>
      </ContainerTitle>

      <br />

      <ContainerCards>
        {pets.map((pet: any) => (
          <CardPet pet={pet} key={pet.id} />
        ))}
      </ContainerCards>
    </Page>
  );
};

export default Pets;
