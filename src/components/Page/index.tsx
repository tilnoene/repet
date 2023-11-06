import Header from '../../components/Header';
import NavigationBar from '../../components/NavigationBar';

import { ContainerPage, Content } from './styles';

const Page = ({
  children,
  menuOption = 0,
}: {
  children: any;
  menuOption?: number;
}) => {
  return (
    <ContainerPage>
      <Header />
      <Content>{children}</Content>
      <NavigationBar option={menuOption} />
    </ContainerPage>
  );
};

export default Page;
