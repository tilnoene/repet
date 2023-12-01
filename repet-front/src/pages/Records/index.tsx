import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Page from '../../components/Page';
import CardRecord from '../../components/CardRecord';
import PrimaryText from '../../components/PrimaryText';
import Icon from '../../components/Icon';
import CardVaccine from '../../components/CardVaccine';

import { ContainerCards, ContainerTitle } from './styles';

import plusIcon from '../../assets/icons/plus.svg';

import api from '../../services/api';
import { parseVaccines } from '../../services/utils';

const Records = () => {
  const [records, setRecords] = useState<PetRecord[]>([]);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);

  const [loadingRecords, setLoadingRecords] = useState<boolean>(true);
  const [loadingVaccines, setLoadingVaccines] = useState<boolean>(true);

  const getRecords = () => {
    setLoadingRecords(true);

    api.get('/records/').then((response: any) => {
      setRecords(response.data);
      getVaccines();
      setLoadingRecords(false);
    });
  };

  const getVaccines = () => {
    setLoadingVaccines(true);

    api.get('/vaccines/').then((response: any) => {
      setVaccines(parseVaccines(response.data));
      setLoadingVaccines(false);
    });
  };

  useEffect(() => {
    getRecords();
    getVaccines();
  }, []);

  return (
    <Page menuOption={3} loading={loadingRecords || loadingVaccines}>
      <ContainerTitle>
        <PrimaryText>Meus Registros</PrimaryText>

        <Link to="/create-record">
          <Icon src={plusIcon} color="blue" size="20px" clickable />
        </Link>
      </ContainerTitle>

      <br />

      <ContainerCards>
        {vaccines.map(vaccine => (
          <CardVaccine vaccine={vaccine} key={vaccine.id} />
        ))}

        {records.map(record => (
          <CardRecord record={record} key={record.id} />
        ))}
      </ContainerCards>
    </Page>
  );
};

export default Records;
