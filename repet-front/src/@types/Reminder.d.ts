type Reminder = {
  id: number;
  title: string;
  pet_name: string;
  date?: string; // TODO: dayjs
  time?: string;
  attributes: string[];
}
