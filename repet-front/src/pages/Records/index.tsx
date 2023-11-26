import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Page from '../../components/Page';
import CardRecord from '../../components/CardRecord';
import PrimaryText from '../../components/PrimaryText';
import Icon from '../../components/Icon';

import { ContainerCards, ContainerTitle } from './styles';
import plusIcon from '../../assets/icons/plus.svg';

import api from '../../services/api';

const Records = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getRecords = () => {
    setLoading(true);

    api.get('/records').then((response: any) => {
      setRecords(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <Page menuOption={3} loading={loading}>
      <ContainerTitle>
        <PrimaryText>Meus Registros</PrimaryText>

        <Link to="/create-record">
          <Icon src={plusIcon} color='blue' size="20px" />
        </Link>
      </ContainerTitle>

      <br />

      <ContainerCards>
        {records.map(record => (
          <CardRecord record={record} key={record.id} />
        ))}
      </ContainerCards>
    </Page>
  );
};

export default Records;
