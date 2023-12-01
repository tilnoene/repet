import { useState, useEffect } from 'react';

import Page from '../../components/Page';
import SecondaryText from '../../components/SecondaryText';
import PrimaryText from '../../components/PrimaryText';
import CardUser from '../../components/CardUser';
import Button from '../../components/Button';
import Br from '../../components/Br';

import { ContainerCard, ContainerPage, InfoGroup } from './styles';

import api from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/authContext';

import dayjs from 'dayjs';
import Card from '../../components/Card';

const Profile = () => {
  const { userId, logout } = useAuth() || {};

  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const [birthdate, setBirthdate] = useState<string>(
    dayjs().format('DD/MM/YYYY'),
  );
  const [gender, setGender] = useState<string>('');

  const getUser = () => {
    setLoading(true);

    api
      .get(`/users/${userId}/`)
      .then((response: any) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error: any) => {
        toast.error('Erro ao carregar o usuário.');
        console.error(error);
      });
  };

  useEffect(() => {
    getUser();

    const savedBirthdate = localStorage.getItem('birthdate');
    const savedGender = localStorage.getItem('gender');
    if (savedBirthdate) setBirthdate(savedBirthdate);
    if (savedGender) setGender(savedGender);
  }, []);

  useEffect(() => {
    // Salvar dados no Local Storage quando eles mudam
    localStorage.setItem('birthdate', birthdate);
    localStorage.setItem('gender', gender);
  }, [birthdate, gender]);

  return (
    <Page menuOption={4} loading={loading}>
      <ContainerPage>
        <InfoGroup>
          <CardUser user={user as User} />
        </InfoGroup>

        <Card borderRadius="10px">
          <ContainerCard>
            <InfoGroup>
              <SecondaryText>Nome</SecondaryText>
              <PrimaryText fontSize="18px">{user?.name}</PrimaryText>
            </InfoGroup>

            <InfoGroup>
              <SecondaryText>Gênero</SecondaryText>
              <select value={gender} onChange={e => setGender(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Não-binário">Não-binário</option>
              </select>
            </InfoGroup>

            <InfoGroup>
              <SecondaryText>Email</SecondaryText>
              <PrimaryText fontSize="18px">{user?.email}</PrimaryText>
            </InfoGroup>

            <InfoGroup>
              <SecondaryText>Data de Nascimento</SecondaryText>
              <input
                type="date"
                value={birthdate}
                onChange={e => setBirthdate(e.target.value)}
              />
            </InfoGroup>
          </ContainerCard>
        </Card>

        <Button name="SAIR" color="red" onClick={() => {
          if (logout) {
            logout();
            toast.success('Você saiu da sua conta.');
          }
        }} />
      </ContainerPage>
    </Page>
  );
};

export default Profile;
