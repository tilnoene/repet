interface PetRecord {
  id: number;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm:ss
  pet: {
    name: string;
  };
}
