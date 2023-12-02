import { useState } from 'react';

import Card from '../Card';
import PrimaryText from '../PrimaryText';
import SecondaryText from '../SecondaryText';
import Icon from '../Icon';
import FloatingOptions from '../FloatingOptions';
import Modal from '../Modal';
import Button from '../Button';

import { Content, Footer, Header, PetName } from './styles';

import pawIcon from '../../assets/icons/paw.svg';
import dotsIcon from '../../assets/icons/dots-3-horizontal.svg';

import dayjs from 'dayjs';
import api from '../../services/api';
import { toast } from 'react-toastify';

const CardRecord = ({
  record,
  removeRecordFromList,
  ...props
}: {
  record: PetRecord;
  removeRecordFromList: any;
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
      .delete(`/records/${record.id}/`)
      .then(() => {
        toast.success(`Registro apagado com sucesso.`);
        removeRecordFromList(record.id);
        handleCloseModalDelete();
      })
      .catch(error => {
        toast.error(`Erro ao apagar o registro.`);
        console.error(error);
      });

    setLoading(false);
  };

  return (
    <Card {...props}>
      <Content>
        <Header>
          <PrimaryText>{record.title}</PrimaryText>

          <div>
            <Icon
              src={dotsIcon}
              color="primaryText"
              size="32px"
              onClick={() => handleOpenModalOptions()}
            />

            {openModalOptions && (
              <FloatingOptions
                loading={loading}
                editUrl={`/edit-record/${record.id}`}
                handleCloseModalOptions={handleCloseModalOptions}
                handleOpenModalDelete={handleOpenModalDelete}
              />
            )}
          </div>
        </Header>

        <SecondaryText>{record.description}</SecondaryText>

        <Footer>
          <PetName>
            <Icon src={pawIcon} color="black" size="16px" />
            <PrimaryText fontSize="15px">{record.pet.name}</PrimaryText>
          </PetName>

          <SecondaryText>{`${dayjs(record.date).format('DD/MM/YYYY')} ${
            record?.time &&
            `- ${dayjs(record.time, 'HH:mm:ss').format('HH:mm')}`
          }`}</SecondaryText>
        </Footer>
      </Content>

      {openModalDelete && (
        <Modal
          title={`Deseja apagar o registro?`}
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

export default CardRecord;
