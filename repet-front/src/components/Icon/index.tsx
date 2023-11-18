import { ContainerIcon } from './styles';

const Icon = ({ src, isBlue }: { src: any, isBlue?: boolean }) => {
  return <ContainerIcon src={src} isBlue={isBlue} />
}

export default Icon;
