import { api } from "./api";

export const createControleParasitarioService = async (
  controleParasitarioData: any
) => {
  return await api.post("/parasite-control/", { ...controleParasitarioData });
};

export const updateControleParasitarioService = async (
  controleParasitarioData: any
) => {
  return await api.patch(`/parasite-control/${controleParasitarioData.id}`, {
    ...controleParasitarioData,
  });
};

export const deleteControleParasitarioService = async (id: any) => {
  return await api.delete(`/parasite-control/${id}`);
};

export const getControleParasitariosService = async (id: any) => {
  return await api.get(`/pets/${id}`);
};
