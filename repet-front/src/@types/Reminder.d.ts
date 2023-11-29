type Reminder = {
  id: number;
  title: string;
  description: string;
  color?: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM:SS
  pet: {
    name: string;
  };
};
