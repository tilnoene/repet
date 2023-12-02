import { useState } from 'react';
import { Link } from 'react-router-dom';

import Card from '../Card';
import PrimaryText from '../PrimaryText';
import SecondaryText from '../SecondaryText';
import Icon from '../Icon';
import Modal from '../Modal';

import { ContainerCard, ContainerIcons, Image } from './styles';

import deleteIcon from '../../assets/icons/trash.svg';
import editIcon from '../../assets/icons/pencil.svg';

import angora from '../../assets/images/angora.png';
import Button from '../Button';
import api from '../../services/api';
import { toast } from 'react-toastify';

const CardPet = ({
  pet,
  removePetFromList = undefined,
  ...props
}: {
  pet: Pet;
  removePetFromList?: any;
}) => {
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const handleOpenModalDelete = () => {
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleDelete = () => {
    setLoadingDelete(true);

    api
      .delete(`/pets/${pet.id}/`)
      .then(() => {
        toast.success(`Pet apagado com sucesso.`);
        removePetFromList(pet.id);
        setLoadingDelete(false);
        handleCloseModalDelete();
      })
      .catch((error: any) => {
        toast.error(`Erro ao apagar o pet ${pet.name}.`);
        console.error(error);
        setLoadingDelete(false);
      });
  };

  return (
    <Card {...props}>
      <ContainerCard>
        <Link to={`/pets/${pet.id}`}>
          <Image src={angora} />
        </Link>

        <div>
          <Link to={`/pets/${pet.id}`}>
            <PrimaryText isWhite fontSize="18px">
              {pet.name}
            </PrimaryText>
          </Link>
          <SecondaryText isWhite>{pet.type}</SecondaryText>
        </div>

        <ContainerIcons>
          <Link to={`/edit-pet/${pet.id}`}>
            <Icon src={editIcon} color="white" size="24px" clickable />
          </Link>

          <Icon
            src={deleteIcon}
            color="white"
            size="24px"
            clickable
            onClick={() => handleOpenModalDelete()}
          />
        </ContainerIcons>
      </ContainerCard>

      {openModalDelete && (
        <Modal
          title={`Deseja apagar o pet ${pet.name}?`}
          handleClose={handleCloseModalDelete}
        >
          <Button
            name="APAGAR"
            onClick={() => handleDelete()}
            loading={loadingDelete}
            color="red"
          />
        </Modal>
      )}
    </Card>
  );
};

export default CardPet;
