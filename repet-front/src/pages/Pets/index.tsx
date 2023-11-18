import { useState, useEffect } from 'react';

import Page from '../../components/Page';
import api from '../../services/api';

const Pets = () => {
  const [pets, setPets] = useState<any>([]);

  useEffect(() => {
    api.get('/pet').then(response => setPets(response.data));
  }, []);

  return (
    <Page menuOption={2}>
      {pets.map((pet: any) => <div>{pet.name}</div>)}
    </Page>
  );
};

export default Pets;
