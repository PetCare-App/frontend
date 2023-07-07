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
import { Higiene } from '../../types/higiene';

export const PetsHigiene = () => {
	const navigate = useNavigate();
	const { higienes, getHigienes, deleteHigiene } = usePetCareContext();

	const [isFormOpen, setOpenForm] = useState(false);
	const [isCreate, setCreate] = useState(false);
	const [isDeleteConfirmation, setDeleteConfirmation] = useState(false);

	const [higiene, setHigiene] = useState({} as Higiene);

	useEffect(() => {
		!!isFormOpen && !!isCreate
			? navigate('/higiene/create')
			: !!isFormOpen && !isCreate
			? navigate('/higiene/edit')
			: navigate('/higiene/dashboard');
	}, [isFormOpen]);

	const handleOpenCreateForm = () => {
		setHigiene({} as Higiene);
		setOpenForm(true);
		setCreate(true);
	};

	const handleOpenEditForm = (higiene: Higiene) => {
		setOpenForm(true);
		setCreate(false);
		setHigiene(higiene);
	};

	const handleOpenDeleteConfirmation = (higiene: Higiene) => {
		setDeleteConfirmation(true);
		setHigiene(higiene);
	};

	const handleReturnButton = () => {
		setHigiene({} as Higiene);
		setOpenForm(false);
		setCreate(false);
	};

	const handleDeleteHigieneButton = async (id: string) => {
		await deleteHigiene(id);
		setDeleteConfirmation(false);
		setHigiene({} as Higiene);
		getHigienes([id]);
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
					currentHigiene={higiene}
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
						<Button onClick={() => handleDeleteHigieneButton(higiene.id)}>
							Deletar
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Container>
	);
};
