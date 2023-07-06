import { api } from './api';

export const createVaccineService = async (vaccineData: any) => {
	return await api.post('/vaccines/', { ...vaccineData });
};

export const updateVaccineService = async (vaccineData: any) => {
	return await api.patch(`/vaccines/${vaccineData.id}`, { ...vaccineData });
};

export const deleteVaccineService = async (id: any) => {
	return await api.delete(`/vaccines/${id}`);
};

export const getVaccinesService = async () => {
	return await api.get(`/vaccines`);
};
