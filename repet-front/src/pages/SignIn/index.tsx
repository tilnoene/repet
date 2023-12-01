import { useState } from 'react';
import { useNavigate } from 'react-router';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { ContainerInput, ContainerPage } from './styles';

import { useAuth } from '../../context/authContext';

import { toast } from 'react-toastify';

const SignIn = () => {
  const { login } = useAuth() || {};
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = () => {
    setLoading(true);

    // TODO: validar dados

    if (login) {
      login(username, password).then(() => {
        navigate('/');
        setLoading(false);
        toast.success('Login realizado com sucesso.');
      }).catch((error) => {
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
          label="Nome de usuário"
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

      <Button name="ENTRAR" onClick={() => handleLogin()} loading={loading} />
    </ContainerPage>
  );
};

export default SignIn;
