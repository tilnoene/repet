import { Dayjs } from 'dayjs';

interface Record {
  id: number;
  title: string;
  description: string;
  date: Dayjs;
  pet: {
    name: string;
  };
}
