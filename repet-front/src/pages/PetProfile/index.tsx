import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import Page from '../../components/Page';
import PrimaryText from '../../components/PrimaryText';
import SecondaryText from '../../components/SecondaryText';
import Icon from '../../components/Icon';
import LoadingPoints from '../../components/LoadingPoints';

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
  ContainerTitle,
} from './styles';

import plusIcon from '../../assets/icons/plus.svg';

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
  const [loadingVaccines, setLoadingVaccines] = useState<boolean>(true);

  const [records, setRecords] = useState<PetRecord[]>([]);
  const [loadingRecords, setLoadingRecords] = useState<boolean>(true);

  const getPet = () => {
    setLoading(true);

    api
      .get(`/pets/${id}/`)
      .then((response: any) => {
        setPet(response.data);
        setLoading(false);

        getPetVaccines();
        getPetRecords();
      })
      .catch((error: any) => {
        toast.error('Erro ao carregar o pet');
        console.error(error);
      });
  };

  const getPetVaccines = () => {
    api
      .get(`/vaccines/?pet_id=${id}`)
      .then((response: any) => {
        setVaccines(response.data);
        setLoadingVaccines(false);
      })
      .catch((error: any) => {
        toast.error('Erro ao carregar as vacinas');
        console.error(error);
      });
  };

  const getPetRecords = () => {
    api
      .get(`/records/?pet_id=${id}`)
      .then((response: any) => {
        setRecords(response.data);
        setLoadingRecords(false);
      })
      .catch((error: any) => {
        toast.error('Erro ao carregar os registros');
        console.error(error);
      });
  };

  useEffect(() => {
    getPet();
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
                  <PrimaryText fontSize="18px">
                    {dayjs(pet.birthdate).format('DD/MM/YYYY')}
                  </PrimaryText>
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
                    {dayjs().diff(dayjs(pet.birthdate), 'year')} anos
                  </PrimaryText>
                </CardTopic>
              </CardColumn>
            </PetInfo>

            <ContainerCards>
              <ContainerTitle>
                <PrimaryText>Vacinas</PrimaryText>

                <Link to={`/create-record?is_vaccine=true&pet_id=${pet.id}`}>
                  <Icon src={plusIcon} color="blue" size="20px" clickable />
                </Link>
              </ContainerTitle>

              {loadingVaccines ? (
                <LoadingPoints />
              ) : vaccines.length > 0 ? (
                vaccines.map((vaccine: any) => (
                  <CardRecord key={vaccine.id} record={vaccine} />
                ))
              ) : (
                <SecondaryText>Não há vacinas.</SecondaryText>
              )}
            </ContainerCards>

            <ContainerCards>
              <ContainerTitle>
                <PrimaryText>Registros</PrimaryText>

                <Link to={`/create-record?pet_id=${pet.id}`}>
                  <Icon src={plusIcon} color="blue" size="20px" clickable />
                </Link>
              </ContainerTitle>

              {loadingRecords ? (
                <LoadingPoints />
              ) : records.length > 0 ? (
                records.map((record: any) => (
                  <CardRecord key={record.id} record={record} />
                ))
              ) : (
                <SecondaryText>Não há registros.</SecondaryText>
              )}
            </ContainerCards>
          </ProfileCard>
        </ContainerPage>
      )}
    </Page>
  );
};

export default PetProfile;
