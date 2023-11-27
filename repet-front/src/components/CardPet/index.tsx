import { Link } from 'react-router-dom';

import Card from '../Card';
import PrimaryText from '../PrimaryText';
import SecondaryText from '../SecondaryText';
import Icon from '../Icon';

import { ContainerCard, ContainerIcons, Image } from './styles';

import deleteIcon from '../../assets/icons/pencil.svg'; // TODO:
import editIcon from '../../assets/icons/pencil.svg';

import angora from '../../assets/images/angora.png';

const CardPet = ({ pet, ...props }: { pet: any }) => {
  // TODO: tipar pet
  return (
    <Link to={`/pets/${pet.id}`}>
      <Card {...props}>
        <ContainerCard>
          <Image src={angora} />

          <div>
            <PrimaryText isWhite fontSize="18px">
              {pet.name}
            </PrimaryText>
            <SecondaryText isWhite>{pet.type}</SecondaryText>
          </div>

          <ContainerIcons>
            <Icon src={deleteIcon} color="white" size="24px" clickable />
            <Icon src={editIcon} color="white" size="24px" clickable />
          </ContainerIcons>
        </ContainerCard>
      </Card>
    </Link>
  );
};

export default CardPet;
