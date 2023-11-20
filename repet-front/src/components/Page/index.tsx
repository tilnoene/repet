import Header from '../Header';
import NavigationBar from '../NavigationBar';
import Loading from '../Loading';

import { ContainerPage, Content } from './styles';

const Page = ({
  children,
  menuOption = 0,
  loading = false,
  padding = true,
}: {
  children: any;
  menuOption?: number;
  loading?: boolean;
  padding?: boolean;
}) => {
  return (
    <ContainerPage>
      <Header />

      <Content centered={loading} padding={padding && !loading}>
        {loading ? <Loading /> : <>{children}</>}
      </Content>

      <NavigationBar option={menuOption} />
    </ContainerPage>
  );
};

export default Page;
