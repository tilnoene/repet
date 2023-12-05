import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Card from '../Card';
import PrimaryText from '../PrimaryText';
import SecondaryText from '../SecondaryText';
import Icon from '../Icon';
import Modal from '../Modal';
import Button from '../Button';

import { ContainerCard, ContainerIcons, ContentIcons, Image } from './styles';

import deleteIcon from '../../assets/icons/trash.svg';
import editIcon from '../../assets/icons/pencil.svg';
import defaultPetImage from '../../assets/images/default-pet-image.jpg';

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
  const navigate = useNavigate();

  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const handleOpenModalDelete = (e: any) => {
    e.stopPropagation();
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

  const handleRedirectEditPage = (e: any) => {
    e.stopPropagation();
    navigate(`/edit-pet/${pet.id}`);
  };

  return (
    <Card {...props}>
      <ContainerCard onClick={() => navigate(`/pets/${pet.id}`)}>
        <Link to={`/pets/${pet.id}`}>
          <Image src={pet?.image || defaultPetImage} />
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
          <ContentIcons>
            <Icon
              src={editIcon}
              color="white"
              size="24px"
              clickable
              onClick={(e: any) => handleRedirectEditPage(e)}
            />

            <Icon
              src={deleteIcon}
              color="white"
              size="24px"
              clickable
              onClick={(e: any) => handleOpenModalDelete(e)}
            />
          </ContentIcons>
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
