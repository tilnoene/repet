import { useState } from 'react';
import { useNavigate } from 'react-router';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { ContainerFooterText, ContainerInput, ContainerPage } from './styles';

import { useAuth } from '../../context/authContext';

import { toast } from 'react-toastify';
import SecondaryText from '../../components/SecondaryText';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const { login } = useAuth() || {};
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = () => {
    if (username === '') {
      toast.error('O nome de usuário está vazio.');
      return;
    }

    if (password === '') {
      toast.error('A senha está vazia.');
      return;
    }

    setLoading(true);

    if (login) {
      login(username, password)
        .then(() => {
          toast.success('Login realizado com sucesso.');
          setLoading(false);
          navigate('/');
        })
        .catch(error => {
          toast.error('As credenciais estão incorretas.');
          console.error(error);
          setLoading(false);
        });
    }
  };

  return (
    <ContainerPage>
      <ContainerInput>
        <Input
          label="Email ou nome de usuário"
          value={username}
          setValue={setUsername}
        />

        <Input
          label="Senha"
          value={password}
          setValue={setPassword}
          type="password"
        />
      </ContainerInput>

      <Button name="ENTRAR" onClick={() => handleSignIn()} loading={loading} />

      <ContainerFooterText>
        <SecondaryText>
          Ainda não tem uma conta? <Link to="/sign-up">Cadastre-se</Link>.
        </SecondaryText>

        <SecondaryText>
          <Link to="/recover-password">Esqueci minha senha</Link>.
        </SecondaryText>
      </ContainerFooterText>
    </ContainerPage>
  );
};

export default SignIn;
