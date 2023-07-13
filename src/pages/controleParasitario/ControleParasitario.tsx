import React, { useEffect, useState } from 'react';
import { usePetCareContext } from '../../context';

import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Form } from './Form';
import { ControleParasitario } from '../../types/controleParasitario';

export const PetsControleParasitario = () => {
	const navigate = useNavigate();
	const { getControleParasitarios, deleteControleParasitario, controleParasitarios } =
		usePetCareContext();

	const [isFormOpen, setOpenForm] = useState(false);
	const [isCreate, setCreate] = useState(false);
	const [isDeleteConfirmation, setDeleteConfirmation] = useState(false);
	const [reloadPage, setReloadPage] = useState(false)

	const [controleParasitario, setControleParasitario] = useState(
		{} as ControleParasitario
	);

	useEffect(() => {
		!!isFormOpen && !!isCreate
			? navigate('/controle-parasitario/create')
			: !!isFormOpen && !isCreate
			? navigate('/controle-parasitario/edit')
			: navigate('/controle-parasitario/dashboard');
	}, [isFormOpen]);

	useEffect(() => {
		if(!!reloadPage) {
			const filteredlist = controleParasitarios.filter((controle: any) => controle.id !== controleParasitario.id)

			const filteredData = filteredlist.map((data: any) => data.petId)
			getControleParasitarios(filteredData); 
			setReloadPage(false)
	}
	
	}, [reloadPage])

	const handleOpenCreateForm = () => {
		setControleParasitario({} as ControleParasitario);
		setOpenForm(true);
		setCreate(true);
	};

	const handleOpenEditForm = (controleParasitario: ControleParasitario) => {
		setOpenForm(true);
		setCreate(false);
		setControleParasitario(controleParasitario);
	};

	const handleOpenDeleteConfirmation = (
		controleParasitario: ControleParasitario
	) => {
		setDeleteConfirmation(true);
		setControleParasitario(controleParasitario);
	};

	const handleReturnButton = () => {
		setControleParasitario({} as ControleParasitario);
		setOpenForm(false);
		setCreate(false);
	};

	const handleDeleteControleParasitarioButton = async (id: string) => {
		await deleteControleParasitario(id);
		setDeleteConfirmation(false);
		setControleParasitario({...controleParasitario, id: id})
		setReloadPage(true)
	};

	return (
		<Container sx={{ display: 'flex', flexDirection: 'column' }}>
			{!isFormOpen ? (
				<Dashboard
					handleOpenCreateForm={handleOpenCreateForm}
					handleOpenEditForm={handleOpenEditForm}
					handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}
				/>
			) : (
				<Form
					isCreate={isCreate}
					handleReturnButton={handleReturnButton}
					currentControleParasitario={controleParasitario}
				></Form>
			)}

			{!!isDeleteConfirmation && (
				<Dialog
					open={isDeleteConfirmation}
					onClose={() => setDeleteConfirmation(false)}
				>
					<DialogTitle>Deletar pet</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Você confirma que gostaria de deletar o pet?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setDeleteConfirmation(false)}>
							Cancelar
						</Button>
						<Button
							onClick={() =>
								handleDeleteControleParasitarioButton(controleParasitario.id)
							}
						>
							Deletar
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Container>
	);
};
