import { useState, useEffect } from 'react';

import Page from '../../components/Page';
import CardPet from '../../components/CardPet';
import PrimaryText from '../../components/PrimaryText';

import api from '../../services/api';
import { ContainerCards } from './styles';

const Pets = () => {
  const [pets, setPets] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getPets = () => {
    setLoading(true);

    api.get('/pet').then(response => {
      setPets(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <Page menuOption={2} loading={loading}>
      <div>
        <PrimaryText>Meus Pets</PrimaryText>
      </div>

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
