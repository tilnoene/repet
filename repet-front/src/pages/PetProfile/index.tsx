import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Page from '../../components/Page';

import { ContainerPage, ProfileCard, Image } from './styles';

import api from '../../services/api';
import angora from '../../assets/images/angora.png';

const PetProfile = () => {
  const { id } = useParams();

  const [pet, setPet] = useState<any>(); // TODO: tipar pet
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetPet = () => {
    setLoading(true);

    api
      .get(`/pet/${id}`)
      .then((response: any) => {
        setPet(response.data);
        setLoading(false);
      })
      .catch((error: any) => console.error(error));
  };

  useEffect(() => {
    handleGetPet();
  }, []);

  return (
    <Page menuOption={2} loading={loading} padding={false}>
      {pet && <ContainerPage>
        <Image src={angora} />

        <ProfileCard>

        </ProfileCard>
      </ContainerPage>}
    </Page>
  );
};

export default PetProfile;
