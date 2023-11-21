import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Page from '../../components/Page';

import { ContainerPage, ProfileCard, Image, CardHeader, CardHeaderTitle, CardHeaderIcons, CardContent, CardColumn, CardTopic } from './styles';

import api from '../../services/api';

import angora from '../../assets/images/angora.png';
import PrimaryText from '../../components/PrimaryText';
import SecondaryText from '../../components/SecondaryText';
import dayjs from 'dayjs';

const PetProfile = () => {
  const { id } = useParams();

  const [pet, setPet] = useState<any>(); // TODO: tipar pet
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetPet = () => {
    setLoading(true);

    api
      .get(`/pets/${id}`)
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
          <CardHeader>
            <CardHeaderTitle>
              <PrimaryText>{pet.name}</PrimaryText>
              <SecondaryText>{pet.type}</SecondaryText>
            </CardHeaderTitle>

            <CardHeaderIcons>
              {/* TODO: icones */}
            </CardHeaderIcons>
          </CardHeader>

          <CardContent>
            <CardColumn>
              <CardTopic>
                <SecondaryText>Raça</SecondaryText>
                <PrimaryText>{pet.breed}</PrimaryText>
              </CardTopic>

              <CardTopic>
                <SecondaryText>Data de Nascimento</SecondaryText>
                <PrimaryText>{pet.birthdate}</PrimaryText>
              </CardTopic>

              <CardTopic>
                <SecondaryText>Peso</SecondaryText>
                <PrimaryText>{pet.weight} kg</PrimaryText>
              </CardTopic>
            </CardColumn>

            <CardColumn>
              <CardTopic>
                <SecondaryText>Sexo</SecondaryText>
                <PrimaryText>{pet.gender}</PrimaryText>
              </CardTopic>

              <CardTopic>
                <SecondaryText>Idade</SecondaryText>
                <PrimaryText>{dayjs().diff(dayjs(new Date(2018, 8, 18)), 'year')} anos</PrimaryText>
              </CardTopic>
            </CardColumn>
          </CardContent>
        </ProfileCard>
      </ContainerPage>}
    </Page>
  );
};

export default PetProfile;
