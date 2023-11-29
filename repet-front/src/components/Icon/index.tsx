import { ContainerIcon } from './styles';

const Icon = ({
  src,
  isBlue,
  disabled = false,
  size = '36px',
  color = 'gray',
  clickable = false,
  onClick = undefined,
  ...props
}: {
  src: any;
  isBlue?: boolean;
  disabled?: boolean;
  size?: string;
  color?: string;
  clickable?: boolean;
  onClick?: any;
}) => {
  let filter =
    'invert(97%) sepia(2%) saturate(1355%) hue-rotate(175deg) brightness(94%) contrast(88%)';

  if (color === 'blue') {
    filter =
      'invert(36%) sepia(64%) saturate(3016%) hue-rotate(191deg) brightness(105%) contrast(105%)';
  } else if (color === 'white') {
    filter =
      'invert(100%) sepia(100%) saturate(0%) hue-rotate(39deg) brightness(109%) contrast(101%)';
  } else if (color === 'black') {
    filter = 'none';
  }

  if (disabled) {
    filter =
      'invert(97%) sepia(2%) saturate(1355%) hue-rotate(175deg) brightness(94%) contrast(88%)';
  }

  return (
    <ContainerIcon src={src} filter={filter} size={size} disabled={disabled} clickable={clickable} onClick={onClick} {...props} />
  );
};

export default Icon;
