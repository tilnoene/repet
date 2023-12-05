import Icon from '../Icon';
import PrimaryText from '../PrimaryText';

import { Container, ContainerModal, HeaderModal } from './styles';

import closeIcon from '../../assets/icons/close.svg';

const Modal = ({
  title,
  handleClose,
  children,
}: {
  title: string;
  handleClose: any;
  children: any;
}) => {
  return (
    <>
      <Container onClick={handleClose} />
      <ContainerModal>
        <HeaderModal>
          <PrimaryText>{title}</PrimaryText>
          <Icon
            src={closeIcon}
            color="primaryText"
            size="32px"
            clickable
            onClick={handleClose}
          />
        </HeaderModal>

        <div>{children}</div>
      </ContainerModal>
    </>
  );
};

export default Modal;
