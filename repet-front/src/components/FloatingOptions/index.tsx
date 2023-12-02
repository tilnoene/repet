import { Link } from 'react-router-dom';

import Icon from '../Icon';
import LoadingPoints from '../LoadingPoints';

import { ContainerModalOptions, ContentModalOptions, Divider, Option } from './styles';

import checkIcon from '../../assets/icons/check.svg';
import editIcon from '../../assets/icons/pencil.svg';
import trashIcon from '../../assets/icons/trash.svg';
import closeIcon from '../../assets/icons/close.svg';

import config from '../../config.json';

const OptionLoading = () => {
  return (
    <Option centered>
      <LoadingPoints color={config.colors.primaryText} size={8} margin={5} />
    </Option>
  );
};

const FloatingOptions = ({
  loading,
  editUrl,
  handleCloseModalOptions,
  handleOpenModalDelete,
  handleOpenModalCheck = undefined,
}: {
  loading: boolean;
  editUrl: string;
  handleCloseModalOptions: any;
  handleOpenModalDelete: any;
  handleOpenModalCheck?: any;
}) => {
  return (
    <ContainerModalOptions>
      <ContentModalOptions>
        {handleOpenModalCheck && (
          <>
            {loading ? (
              <OptionLoading />
            ) : (
              <Option paddingLeft="12px" onClick={() => handleOpenModalCheck()}>
                <Icon src={checkIcon} color="secondaryText" size="18px" />
                Concluído
              </Option>
            )}

            <Divider />
          </>
        )}

        {loading ? (
          <OptionLoading />
        ) : (
          <Link to={editUrl}>
            <Option>
              <Icon src={editIcon} color="secondaryText" size="20px" />
              Editar
            </Option>
          </Link>
        )}

        <Divider />

        {loading ? (
          <OptionLoading />
        ) : (
          <Option onClick={() => handleOpenModalDelete()}>
            <Icon src={trashIcon} color="secondaryText" size="20px" /> Apagar
          </Option>
        )}

        <Divider />

        <Option onClick={() => handleCloseModalOptions()} paddingLeft="12px">
          <Icon src={closeIcon} color="secondaryText" size="16px" /> Fechar
        </Option>
      </ContentModalOptions>
    </ContainerModalOptions>
  );
};

export default FloatingOptions;
