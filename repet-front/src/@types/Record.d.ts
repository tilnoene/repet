interface PetRecord {
  id: number;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM:SS
  pet: {
    name: string;
  };
}
