import { useState } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { ContainerInput, ContainerPage } from './styles';

import { useAuth } from '../../context/authContext';

const SignIn = () => {
  const { login } = useAuth() || {};

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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

      <Button
        name="ENTRAR"
        onClick={() => login && login('usuario_auth', 'testedesenha')}
      />
    </ContainerPage>
  );
};

export default SignIn;
