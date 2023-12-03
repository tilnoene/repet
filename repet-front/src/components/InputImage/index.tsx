import PrimaryText from '../PrimaryText';
import SecondaryText from '../SecondaryText';
import Icon from '../Icon';

import {
  ContainerIcon,
  ContainerInputImage,
  InputImageStyle,
  Image,
  ContainerImage,
  EditIcon,
  BackgroundSquare,
} from './styles';

import cameraIcon from '../../assets/icons/camera-add.svg';
import penIcon from '../../assets/icons/pen-square.svg';

const InputImage = ({
  label = '',
  required = false,
  value = undefined,
  setValue = undefined,
}: {
  label?: string;
  required?: boolean;
  value?: any;
  setValue?: any;
}) => {
  return (
    <ContainerInputImage>
      <PrimaryText fontSize="16px">
        {label}
        {required && ' *'}
      </PrimaryText>

      {value ? (
        <ContainerImage>
          <Image src={URL.createObjectURL(value)} />

          <EditIcon htmlFor={`input-${label}`}>
            <BackgroundSquare>
              <Icon src={penIcon} color="blue" size="42px" clickable />
            </BackgroundSquare>
          </EditIcon>
        </ContainerImage>
      ) : (
        <ContainerIcon htmlFor={`input-${label}`}>
          <Icon src={cameraIcon} color="blue" size="48px" clickable />
          <SecondaryText>Nenhuma imagem selecionada</SecondaryText>
        </ContainerIcon>
      )}

      <InputImageStyle
        type="file"
        id={`input-${label}`}
        accept="image/png, image/gif, image/jpeg, image/jpg"
        onChange={e => setValue(e.target.files ? e.target.files[0] : undefined)}
      />
    </ContainerInputImage>
  );
};

export default InputImage;
