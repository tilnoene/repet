import { useState, useEffect } from 'react';
import {
  ProfileCard,
  ProfileImage,
  ProfileInfo,
  ProfileName,
  ProfileDescription,
} from './styles';

interface User {
  name: string;
  description: string;
  image: string;
}

const CardUser = ({ user }: { user: User }) => {
  const [description, setDescription] = useState<string>(user.description);

  useEffect(() => {
    const savedDescription = localStorage.getItem('user.description');
    if (savedDescription) setDescription(savedDescription);
  }, []);
  useEffect(() => {
    // Salvar dados no Local Storage quando eles mudam
    localStorage.setItem('user.description', description);
  }, [description]);

  return (
    <ProfileCard>
      <ProfileImage src={user.image} alt={user.name} />
      <ProfileInfo>
        <ProfileName>{user.name}</ProfileName>
        <ProfileDescription>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Escreva sua descrição"
          />
        </ProfileDescription>
      </ProfileInfo>
    </ProfileCard>
  );
};

export default CardUser;
