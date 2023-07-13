import { api } from './api';

export const createHigieneService = async (higieneData: any) => {
	return await api.post('/hygiene/', { ...higieneData });
};

export const updateHigieneService = async (higieneData: any) => {
	return await api.patch(`/hygiene/${higieneData.id}`, { ...higieneData });
};

export const deleteHigieneService = async (id: any) => {
	return await api.delete(`/hygiene/${id}`);
};

export const getHigienesService = async (id: number) => {
	return await api.get(`/hygiene/pet/${id}`);
};
