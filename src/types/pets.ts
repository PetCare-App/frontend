export interface Pet {
  id: number;
  name: string;
  breed: string;
  animalType: string | null;
  gender: string;
  weight?: number | string;
  birthDate?: string;
  userId: number;
}