import Card from '../Card';
import PrimaryText from '../PrimaryText';
import SecondaryText from '../SecondaryText';
import Icon from '../Icon';
import Br from '../Br';

import { ContainerIcon, Content, Footer, Header, PetName } from './styles';

import pawIcon from '../../assets/icons/paw.svg';
import dotsIcon from '../../assets/icons/dots-3-horizontal.svg';
import placeIcon from '../../assets/icons/place.svg';
import vaccineIcon from '../../assets/icons/vaccine.svg';

import dayjs from 'dayjs';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useState } from 'react';
import FloatingOptions from '../FloatingOptions';
import Modal from '../Modal';
import Button from '../Button';

const CardVaccine = ({
  vaccine,
  removeVaccineFromList,
  ...props
}: {
  vaccine: Vaccine;
  removeVaccineFromList: any;
}) => {
  const [openModalOptions, setOpenModalOptions] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const handleOpenModalOptions = () => {
    setOpenModalOptions(true);
  };

  const handleCloseModalOptions = () => {
    setOpenModalOptions(false);
  };

  const handleOpenModalDelete = () => {
    handleCloseModalOptions();
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleDelete = async () => {
    setLoading(true);

    await api
      .delete(`/vaccines/${vaccine.id}/`)
      .then(() => {
        toast.success(`Vacina apagada com sucesso.`);
        removeVaccineFromList(vaccine.id);
        handleCloseModalDelete();
      })
      .catch(error => {
        toast.error(`Erro ao apagar a vacina.`);
        console.error(error);
      });

    setLoading(false);
  };

  return (
    <Card {...props}>
      <Content>
        <Header>
          <PrimaryText>{vaccine.title}</PrimaryText>

          <div>
            <Icon
              src={dotsIcon}
              color="primaryText"
              size="32px"
              onClick={() => handleOpenModalOptions()}
              clickable
            />

            {openModalOptions && (
              <FloatingOptions
                loading={loading}
                editUrl={`/edit-record/${vaccine.id}?is_vaccine=true`}
                handleCloseModalOptions={handleCloseModalOptions}
                handleOpenModalDelete={handleOpenModalDelete}
              />
            )}
          </div>
        </Header>

        <SecondaryText>{vaccine.description}</SecondaryText>
        <Br />

        <ContainerIcon>
          <Icon src={vaccineIcon} color="secondaryText" size="16px" />
          <SecondaryText>{vaccine.veterinarian}</SecondaryText>
        </ContainerIcon>

        <ContainerIcon>
          <Icon src={placeIcon} color="secondaryText" size="16px" />
          <SecondaryText>{vaccine.place}</SecondaryText>
        </ContainerIcon>

        <Footer>
          <PetName>
            <Icon src={pawIcon} color="black" size="16px" />
            <PrimaryText fontSize="15px">{vaccine.pet.name}</PrimaryText>
          </PetName>

          <SecondaryText>{`${dayjs(vaccine.date).format('DD/MM/YYYY')} ${
            vaccine?.time &&
            `- ${dayjs(vaccine.time, 'HH:mm:ss').format('HH:mm')}`
          }`}</SecondaryText>
        </Footer>
      </Content>

      {openModalDelete && (
        <Modal
          title={`Deseja apagar a vacina?`}
          handleClose={handleCloseModalDelete}
        >
          <Button
            name="APAGAR"
            onClick={() => handleDelete()}
            loading={loading}
            color="red"
          />
        </Modal>
      )}
    </Card>
  );
};

export default CardVaccine;
