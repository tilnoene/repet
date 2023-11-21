import { useState, useEffect } from 'react';

import Page from '../../components/Page';
import api from '../../services/api';

const Pets = () => {
  const [pets, setPets] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getPets = () => {
    setLoading(true);

    api.get('/pets').then(response => {
      setPets(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <Page menuOption={2} loading={loading}>
      {pets.map((pet: any) => (
        <div key={pet.id}>{pet.name}</div>
      ))}
    </Page>
  );
};

export default Pets;
