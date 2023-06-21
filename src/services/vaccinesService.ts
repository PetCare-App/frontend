import { api } from "./api";

export const createVaccineService = async (data: {vaccine: string; date: Date; petId: number}) => {

  return await api.post(
    "/vaccines",
    data,
  );
};

// export const getVaccines = async (id: number) => {

//   return await api.get(
//     `/vaccines/${id}`
//   );
// };

export const getVaccinesByPetId = async (id: number) => {

  return await api.get(
    `/vaccines/pet/${id}`
  );
};

