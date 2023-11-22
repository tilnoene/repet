import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Page from '../../components/Page';
import PrimaryText from '../../components/PrimaryText';
import SecondaryText from '../../components/SecondaryText';
import Icon from '../../components/Icon';

import {
  ContainerPage,
  ProfileCard,
  Image,
  CardHeader,
  CardHeaderTitle,
  CardHeaderIcons,
  CardColumn,
  CardTopic,
  PetInfo,
  ContainerCards,
} from './styles';

import api from '../../services/api';

import penIcon from '../../assets/icons/pencil.svg';
import shareIcon from '../../assets/icons/share.svg';

import angora from '../../assets/images/angora.png';
import dayjs from 'dayjs';

const PetProfile = () => {
  const { id } = useParams();

  const [pet, setPet] = useState<any>(); // TODO: tipar pet
  const [loading, setLoading] = useState<boolean>(true);
  const [vaccines, setVaccines] = useState<any>([]); // TODO: tipar
  const [records, setRecords] = useState<any>([]); // TODO: tipar

  const getPet = () => {
    setLoading(true);

    api
      .get(`/pets/${id}`)
      .then((response: any) => {
        setPet(response.data);
        setLoading(false);
      })
      .catch((error: any) => console.error(error)); // TODO: toastify
  };

  const getPetVaccines = () => {
    api
      .get(`/pets/${id}?=vaccines`) // TODO: como?
      .then((response: any) => {
        setVaccines(response.data);
      })
      .catch((error: any) => console.error(error)); // TODO: toastify
  };

  const getPetRecords = () => {
    api
      .get(`/reminders`) // TODO: como?
      .then((response: any) => {
        setRecords(response.data);
      })
      .catch((error: any) => console.error(error)); // TODO: toastify
  };

  useEffect(() => {
    getPet();
    getPetVaccines();
    getPetRecords();
  }, []);

  return (
    <Page menuOption={2} loading={loading} padding={false}>
      {pet && (
        <ContainerPage>
          <Image src={angora} />

          <ProfileCard>
            <CardHeader>
              <CardHeaderTitle>
                <PrimaryText>{pet.name}</PrimaryText>
                <SecondaryText>{pet.type}</SecondaryText>
              </CardHeaderTitle>

              <CardHeaderIcons>
                <Icon src={penIcon} color='blue' size={'32px'} />
                <Icon src={shareIcon} color='blue' size={'32px'} />
              </CardHeaderIcons>
            </CardHeader>

            <PetInfo>
              <CardColumn>
                <CardTopic>
                  <SecondaryText>Raça</SecondaryText>
                  <PrimaryText fontSize="18px">{pet.breed}</PrimaryText>
                </CardTopic>

                <CardTopic>
                  <SecondaryText>Data de Nascimento</SecondaryText>
                  <PrimaryText fontSize="18px">{pet.birthdate}</PrimaryText>
                </CardTopic>

                <CardTopic>
                  <SecondaryText>Peso</SecondaryText>
                  <PrimaryText fontSize="18px">{pet.weight} kg</PrimaryText>
                </CardTopic>
              </CardColumn>

              <CardColumn>
                <CardTopic>
                  <SecondaryText>Sexo</SecondaryText>
                  <PrimaryText fontSize="18px">{pet.gender}</PrimaryText>
                </CardTopic>

                <CardTopic>
                  <SecondaryText>Idade</SecondaryText>
                  <PrimaryText fontSize="18px">
                    {dayjs().diff(dayjs(new Date(2018, 8, 18)), 'year')} anos
                  </PrimaryText>
                </CardTopic>
              </CardColumn>
            </PetInfo>

            <ContainerCards>
              <PrimaryText>Vacinas</PrimaryText>

              {/* TODO: card de vacina */}
            </ContainerCards>

            <ContainerCards>
              <PrimaryText>Registros</PrimaryText>

              {records.map((record: any) => (
                <div key={record.id}>{record.title}</div>
              ))}
            </ContainerCards>
          </ProfileCard>
        </ContainerPage>
      )}
    </Page>
  );
};

export default PetProfile;
