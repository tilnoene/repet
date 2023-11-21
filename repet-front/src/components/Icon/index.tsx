import { ContainerIcon } from './styles';

const Icon = ({ src, isBlue, size = '36px' }: { src: any, isBlue?: boolean, size?: string }) => {
  return <ContainerIcon src={src} isBlue={isBlue} size={size} />
}

export default Icon;
