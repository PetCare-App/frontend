import { api } from './api';

export const updateUserService = async (userData: any) => {
	return await api.patch(`/users/${userData.id}`, { ...userData });
};

export const getUserService = async (userId: number) => {
	return await api.get(`/users/${userId}`);
};
