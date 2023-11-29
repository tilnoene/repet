import { useState, useEffect } from 'react';
import Page from '../../components/Page';
import PrimaryText from '../../components/PrimaryText';
import SecondaryText from '../../components/SecondaryText';
import { ContainerTitle, InfoGroup } from './styles';
import CardUser from '../../components/CardUser';
import userImg from '../../assets/images/user.png';

const user = {
  name: 'Victor Hugo',
  description: 'Amo animais',
  image: userImg,
};

const Profile = () => {
  const [dateOfBirth, setDateOfBirth] = useState<string>('00/00/0000');
  const [gender, setGender] = useState<string>('');

  useEffect(() => {
    const savedDateOfBirth = localStorage.getItem('dateOfBirth');
    const savedGender = localStorage.getItem('gender');
    if (savedDateOfBirth) setDateOfBirth(savedDateOfBirth);
    if (savedGender) setGender(savedGender);
  }, []);

  useEffect(() => {
    // Salvar dados no Local Storage quando eles mudam
    localStorage.setItem('dateOfBirth', dateOfBirth);
    localStorage.setItem('gender', gender);
  }, [dateOfBirth, gender]);

  return (
    <Page menuOption={4}>
      <InfoGroup>
        <CardUser user={user}></CardUser>
      </InfoGroup>
      <ContainerTitle>
        <InfoGroup>
          <PrimaryText>Nome</PrimaryText>
          <SecondaryText>Victor Hugo</SecondaryText>
        </InfoGroup>
        <InfoGroup>
          <PrimaryText>Gênero</PrimaryText>
          <select value={gender} onChange={e => setGender(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Não-binário">Não-binário</option>
          </select>
        </InfoGroup>
        <InfoGroup>
          <PrimaryText>Email</PrimaryText>
          <SecondaryText>victorgameplays123@gmail.com</SecondaryText>
        </InfoGroup>
        <InfoGroup>
          <PrimaryText>Data de Nascimento</PrimaryText>
          <input
            type="date"
            value={dateOfBirth}
            onChange={e => setDateOfBirth(e.target.value)}
          />
        </InfoGroup>
      </ContainerTitle>

      <ContainerTitle>
        <InfoGroup>
          <PrimaryText>Quantidade de Pets</PrimaryText>
          <SecondaryText>2</SecondaryText>
        </InfoGroup>
      </ContainerTitle>
    </Page>
  );
};

export default Profile;
