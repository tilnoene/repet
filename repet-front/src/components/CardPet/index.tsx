import { Link } from 'react-router-dom';

import Card from '../Card';
import PrimaryText from '../PrimaryText';

import { ContainerCard } from './styles';

const CardPet = ({ pet, ...props }: { pet: any }) => {
  // TODO: tipar pet
  return (
    <Link to={`/pets/${pet.id}`}>
      <Card {...props}>
        <ContainerCard>
          <PrimaryText fontSize="16px">{pet.name}</PrimaryText>
        </ContainerCard>
      </Card>
    </Link>
  );
};

export default CardPet;
