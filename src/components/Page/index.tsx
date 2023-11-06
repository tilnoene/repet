import Header from '../../components/Header';
import NavigationBar from '../../components/NavigationBar';

import { ContainerPage, Content } from './styles';

const Page = ({ children }: any) => {
  return (
    <ContainerPage>
      <Header />
      <Content>
        {children}
      </Content>
      <NavigationBar />
    </ContainerPage>
  )
}

export default Page;
