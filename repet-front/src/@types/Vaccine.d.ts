interface Vaccine extends PetRecord {
  veterinarian: string;
  place: string;
  image?: string;
  record: PetRecord;
}
