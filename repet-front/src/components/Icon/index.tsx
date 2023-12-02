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
    'invert(97%) sepia(2%) saturate(1355%) hue-rotate(175deg) brightness(94%) contrast(88%)'; // default gray

  if (color === 'blue') {
    filter =
      'invert(36%) sepia(64%) saturate(3016%) hue-rotate(191deg) brightness(105%) contrast(105%)';
  } else if (color === 'white') {
    filter =
      'invert(100%) sepia(100%) saturate(0%) hue-rotate(39deg) brightness(109%) contrast(101%)';
  } else if (color === 'black') {
    filter = 'none';
  } else if (color === 'primaryText') {
    filter =
      'invert(14%) sepia(11%) saturate(676%) hue-rotate(77deg) brightness(90%) contrast(89%)';
  } else if (color === 'secondaryText') {
    filter =
      'invert(13%) sepia(21%) saturate(354%) hue-rotate(77deg) brightness(96%) contrast(88%)';
  }

  if (disabled) {
    filter =
      'invert(97%) sepia(2%) saturate(1355%) hue-rotate(175deg) brightness(94%) contrast(88%)';
  }

  return (
    <ContainerIcon
      src={src}
      filter={filter}
      size={size}
      disabled={disabled}
      clickable={clickable}
      onClick={onClick}
      {...props}
    />
  );
};

export default Icon;
