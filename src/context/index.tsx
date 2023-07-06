import React, { createContext, useContext, useState } from 'react';
import { Pet } from '../types/pets';
import {
	createPetService,
	deletePetService,
	getPetPdfService,
	getPetsService,
	updatePetService,
} from '../services/pets';
import { User } from '../types/users';
import { getUserService, updateUserService } from '../services/users';
import {
	createHigieneService,
	deleteHigieneService,
	getHigienesService,
	updateHigieneService,
} from '../services/higienes';
import { Higiene } from '../types/higiene';
import { ControleParasitario } from '../types/controleParasitario';
import {
	createControleParasitarioService,
	deleteControleParasitarioService,
	getControleParasitariosService,
	updateControleParasitarioService,
} from '../services/controleParasitarios';
import { Vaccine } from '../types/vaccines';
import {
	createVaccineService,
	deleteVaccineService,
	getVaccinesService,
	updateVaccineService,
} from '../services/vaccinesService';

export const PetCareContext = createContext({} as any);

export function ProviderContext({ children }: any) {
	const [pets, setPets] = useState<any[]>([]);
	const [user, setUser] = useState<User>({ email: '', id: 5, fullname: '' });
	const [higienes, setHigienes] = useState<Higiene[]>([]);
	const [controleParasitarios, setControleParasitarios] = useState<
		ControleParasitario[]
	>([]);
	const [vaccines, setVaccines] = useState<Vaccine[]>([]);

	const [snackbarOpen, setSnackbarOpen] = useState<{
		status: boolean;
		type: string;
		message: string;
	}>({
		status: false,
		type: '',
		message: '',
	});

	const getPets = async () => {
		try {
			const response = await getPetsService(user.id);
			setPets(response.data.pets);
			// setPets([]);
		} catch (error) {
			throw error;
		}
	};

	const createPet = async (petData: any) => {
		try {
			petData.userId = user.id;
			petData.weight = parseFloat(petData.weight);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Sucesso ao cadastrar seu pet :)',
			});
			const response = await createPetService(petData);
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos cadastrar seu pet :(',
			});
			throw error;
		}
	};

	const updatePet = async (petData: any) => {
		try {
			petData.weight = parseFloat(petData.weight);
			const response = await updatePetService(petData);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Sucesso ao alterar seu pet :)',
			});
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos alterar seu pet :(',
			});
			throw error;
		}
	};

	const deletePet = async (id: any) => {
		try {
			const response = await deletePetService(id);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Sucesso ao deletar seu pet',
			});
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos deletar seu pet :(',
			});
			throw error;
		}
	};

	const getUser = async () => {
		try {
			const response = await getUserService(user.id);
			setUser({ ...response.data });
		} catch (error) {
			throw error;
		}
	};

	const updateUser = async (userData: any) => {
		try {
			delete userData.password;
			delete userData.pets;
			const response = await updateUserService(userData);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Cadastro alterado com sucesso! :)',
			});
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos alterar seu cadastro :(',
			});
			throw error;
		}
	};

	const getHigienes = async () => {
		try {
			const response = await getHigienesService();
			setHigienes(response.data);
		} catch (error) {
			throw error;
		}
	};

	const createHigiene = async (higieneData: any) => {
		try {
			const data = {
				...higieneData,
				petId: parseInt(higieneData.petId, 10),
			};
			const response = await createHigieneService(data);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Registro de higiene realizado com sucesso! :)',
			});
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos criar este registro de higiene :(',
			});
			throw error;
		}
	};

	const updateHigiene = async (higieneData: any) => {
		try {
			const response = await updateHigieneService(higieneData);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Registro de higiene alterado com sucesso! :)',
			});
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos alterar este registro de higiene :(',
			});
			throw error;
		}
	};

	const deleteHigiene = async (id: any) => {
		try {
			const response = await deleteHigieneService(id);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Registro de higiene deletado com sucesso! :)',
			});
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos deletar este registro de higiene :(',
			});
			throw error;
		}
	};

	const getControleParasitarios = async () => {
		try {
			const response = await getControleParasitariosService();
			setControleParasitarios(response.data);
		} catch (error) {
			throw error;
		}
	};

	const createControleParasitario = async (controleParasitarioData: any) => {
		try {
			const data = {
				...controleParasitarioData,
				petId: parseInt(controleParasitarioData.petId, 10),
			};
			const response = await createControleParasitarioService(data);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Registro de medicamento realizado com sucesso! :)',
			});
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos criar este registro de medicamento :(',
			});
			throw error;
		}
	};

	const updateControleParasitario = async (controleParasitarioData: any) => {
		try {
			const response = await updateControleParasitarioService(
				controleParasitarioData
			);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Registro de medicamento alterado com sucesso! :)',
			});
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos alterar este registro de medicamento :(',
			});
			throw error;
		}
	};

	const deleteControleParasitario = async (id: any) => {
		try {
			const response = await deleteControleParasitarioService(id);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Registro de medicamento deletado com sucesso! :)',
			});
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos deletar este registro de medicamento :(',
			});
			throw error;
		}
	};

	const getVaccines = async () => {
		try {
			const response = await getVaccinesService();
			setVaccines(response.data);
		} catch (error) {
			throw error;
		}
	};

	const createVaccine = async (vaccineData: any) => {
		try {
			const data = {
				...vaccineData,
				petId: parseInt(vaccineData.petId, 10),
			};
			const response = await createVaccineService(data);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Registro de vacina realizado com sucesso! :)',
			});
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos criar este registro de vacina :(',
			});
			throw error;
		}
	};

	const updateVaccine = async (vaccineData: any) => {
		try {
			const response = await updateVaccineService(vaccineData);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Registro de vacina alterado com sucesso! :)',
			});
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos alterar este registro de vacina :(',
			});
			throw error;
		}
	};

	const deleteVaccine = async (id: any) => {
		try {
			const response = await deleteVaccineService(id);
			setSnackbarOpen({
				status: true,
				type: 'success',
				message: 'Registro de vacina deletado com sucesso! :)',
			});
			return response;
		} catch (error) {
			setSnackbarOpen({
				status: true,
				type: 'error',
				message: 'Nós não conseguimos deletar este registro de vacina :(',
			});
			throw error;
		}
	};

	const getPetPdf = async (id: any) => {
		try {
			const response = await getPetPdfService(id);
			const url = URL.createObjectURL(response.data);
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'arquivo.pdf');
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error('Erro ao baixar o PDF:', error);
		}
	};

	const states = {
		pets,
		user,
		higienes,
		controleParasitarios,
		snackbarOpen,
		vaccines,
	};

	const actions = {
		getPets,
		createPet,
		setUser,
		updatePet,
		deletePet,
		getUser,
		updateUser,
		getHigienes,
		createHigiene,
		setHigienes,
		updateHigiene,
		deleteHigiene,
		getControleParasitarios,
		createControleParasitario,
		updateControleParasitario,
		deleteControleParasitario,
		setSnackbarOpen,
		getPetPdf,
		setVaccines,
		getVaccines,
		createVaccine,
		updateVaccine,
		deleteVaccine,
	};

	return (
		<PetCareContext.Provider value={{ ...states, ...actions }}>
			{children}
		</PetCareContext.Provider>
	);
}

export const usePetCareContext = () => useContext(PetCareContext);
