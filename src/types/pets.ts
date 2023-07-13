export interface Pet {
	id: string;
	name: string;
	breed: string;
	animalType: string | null;
	gender: string;
	weight?: number | string;
	birthDate: string;
	userId: number;
}
