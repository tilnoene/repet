import Header from '../Header';
import NavigationBar from '../NavigationBar';
import Loading from '../Loading';

import { ContainerPage, Content } from './styles';

const Page = ({
  children,
  menuOption = 0,
  loading = true,
}: {
  children: any;
  menuOption?: number;
  loading?: boolean;
}) => {
  return (
    <ContainerPage>
      <Header />

      <Content centered={loading}>
        {loading ? <Loading /> : <>{children}</>}
      </Content>

      <NavigationBar option={menuOption} />
    </ContainerPage>
  );
};

export default Page;
