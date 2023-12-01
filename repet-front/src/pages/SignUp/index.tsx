import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';
import PrimaryText from '../../components/PrimaryText';
import SecondaryText from '../../components/SecondaryText';

import { ContainerInput, ContainerPage, ContainerFooterText } from './styles';

import { toast } from 'react-toastify';
import api from '../../services/api';

const SignUp = () => {
  const navigate = useNavigate();
  let { state } = useLocation();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>(state?.email || '');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = () => {
    if (name === '') {
      toast.error('O nome está vazio.');
      return;
    }

    if (email === '') {
      toast.error('O email está vazio.');
      return;
    }

    if (username === '') {
      toast.error('O nome de usuário está vazio.');
      return;
    }

    if (password.length < 5) {
      toast.error('A senha precisa ter pelo menos 5 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não conferem.');
      return;
    }

    setLoading(true);

    api
      .post('/register/', {
        name: name,
        username: username,
        password: password,
        email: email,
      })
      .then(() => {
        toast.success('Cadastro realizado com sucesso.');
        setLoading(false);
        navigate('/sign-in', { state: { email: email } });
      })
      .catch(error => {
        toast.error('Não foi possível cadastrar o usuário, tente novamente.');
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <ContainerPage>
      <PrimaryText>Criar uma conta</PrimaryText>

      <ContainerInput>
        <Input label="Nome" value={name} setValue={setName} />

        <Input
          label="Email"
          value={email}
          setValue={setEmail}
          type="email"
          placeholder="exemplo@email.com"
        />

        <Input
          label="Nome de usuário"
          value={username}
          setValue={setUsername}
          type="email"
        />

        <Input
          label="Senha"
          value={password}
          setValue={setPassword}
          type="password"
        />

        <Input
          label="Confirme a senha"
          value={confirmPassword}
          setValue={setConfirmPassword}
          type="password"
        />
      </ContainerInput>

      <Button
        name="CADASTRAR"
        onClick={() => handleSignUp()}
        loading={loading}
      />

      <ContainerFooterText>
        <SecondaryText>
          Já tem uma conta?{' '}
          <Link to="/sign-in" state={{ email: email }}>
            Faça login
          </Link>
          .
        </SecondaryText>
      </ContainerFooterText>
    </ContainerPage>
  );
};

export default SignUp;
