import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';
import SecondaryText from '../../components/SecondaryText';
import ForceMobile from '../../components/ForceMobile';

import { ContainerFooterText, ContainerInput, ContainerPage } from './styles';

import { useAuth } from '../../context/authContext';

import { toast } from 'react-toastify';

const SignIn = () => {
  const { login } = useAuth() || {};
  const navigate = useNavigate();
  let { state } = useLocation();

  const [email, setEmail] = useState<string>(state?.email || '');
  const [password, setPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === '') {
      toast.error('O nome de usuário está vazio.');
      return;
    }

    if (password === '') {
      toast.error('A senha está vazia.');
      return;
    }

    setLoading(true);

    if (login) {
      login(email, password)
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
    <ForceMobile>
      <form onSubmit={handleSignIn}>
        <ContainerPage>
          <ContainerInput>
            <Input
              label="Email ou nome de usuário"
              value={email}
              setValue={setEmail}
            />

            <Input
              label="Senha"
              value={password}
              setValue={setPassword}
              type="password"
            />
          </ContainerInput>

          <Button
            type="submit"
            name="ENTRAR"
            // onClick={() => handleSignIn()}
            loading={loading}
          />

          <ContainerFooterText>
            <SecondaryText>
              Ainda não tem uma conta?{' '}
              <Link to="/sign-up" state={{ email: email }}>
                Cadastre-se
              </Link>
              .
            </SecondaryText>

            <SecondaryText>
              <Link to="/recover-password" state={{ email: email }}>
                Esqueci minha senha
              </Link>
              .
            </SecondaryText>
          </ContainerFooterText>
        </ContainerPage>
      </form>
    </ForceMobile>
  );
};

export default SignIn;
