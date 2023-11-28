import { Dayjs } from 'dayjs';

type Pet = {
  id: number;
  name: string;
  gender: string;
  type: string;
  birthdate: Dayjs;
  breed: string;
  weight: number;
};
