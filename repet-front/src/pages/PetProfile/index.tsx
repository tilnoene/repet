import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

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

import penIcon from '../../assets/icons/pencil.svg';
import shareIcon from '../../assets/icons/share.svg';

import api from '../../services/api';
import { toast } from 'react-toastify';

import angora from '../../assets/images/angora.png';
import CardRecord from '../../components/CardRecord';

const PetProfile = () => {
  const { id } = useParams();

  const [pet, setPet] = useState<Pet | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [records, setRecords] = useState<PetRecord[]>([]);

  const getPet = () => {
    setLoading(true);

    api
      .get(`/pets/${id}/`)
      .then((response: any) => {
        setPet(response.data);
        setLoading(false);
      })
      .catch((error: any) => {
        toast.error('Erro ao carregar o pet');
        console.error(error);
      });
  };

  const getPetVaccines = () => {
    api
      .get(`/vaccines/`) // TODO: como?
      .then((response: any) => {
        setVaccines(response.data);
      })
      .catch((error: any) => {
        toast.error('Erro ao carregar as vacinas');
        console.error(error);
      });
  };

  const getPetRecords = () => {
    api
      .get(`/records/`)
      .then((response: any) => {
        setRecords(response.data);
      })
      .catch((error: any) => {
        toast.error('Erro ao carregar os registros');
        console.error(error);
      });
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
                <Icon src={penIcon} color="blue" size={'32px'} />
                <Icon src={shareIcon} color="blue" size={'32px'} />
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

              <br />

              {records.map((record: any) => (
                <CardRecord key={record.id} record={record} />
              ))}
            </ContainerCards>
          </ProfileCard>
        </ContainerPage>
      )}
    </Page>
  );
};

export default PetProfile;
