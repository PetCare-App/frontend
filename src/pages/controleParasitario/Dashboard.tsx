import React, { useEffect, useState } from 'react';
import { usePetCareContext } from '../../context';

import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Container,
	Box,
	IconButton,
	Stack,
	Snackbar,
	Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ControleParasitario } from '../../types/controleParasitario';

interface DashboardProps {
	handleOpenCreateForm: () => void;
	handleOpenEditForm: (controleParasitario: ControleParasitario) => void;
	handleOpenDeleteConfirmation: (
		controleParasitario: ControleParasitario
	) => void;
}

export const Dashboard = ({
	handleOpenCreateForm,
	handleOpenEditForm,
	handleOpenDeleteConfirmation,
}: DashboardProps) => {
	const {
		controleParasitarios,
		getControleParasitarios,
		pets,
		successMessage,
		setSuccessMessage,
		deleteErrorMessage,
		setDeleteErrorMessage,
		setDeleteSuccessMessage,
		deleteSuccessMessage,
	} = usePetCareContext();

	const handleCloseSnackbar = () => {
		setSuccessMessage(false);
		setDeleteErrorMessage(false);
		setDeleteSuccessMessage(false);
	};

	useEffect(() => {
		getControleParasitarios();
	}, []);

	const dateFormat = (date: any) => {
		const deleteTimestamp = date?.split('T')[0];
		const day = deleteTimestamp.split('-')[2];
		const month = deleteTimestamp.split('-')[1];
		const year = deleteTimestamp.split('-')[0];

		return `${day}/${month}/${year}`;
	};

	return (
		<>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'flex-end',
					padding: '40px 0px',
				}}
			>
				<IconButton onClick={handleOpenCreateForm}>
					<AddIcon sx={{ fontSize: '30px' }} />
				</IconButton>
			</Box>
			<Container
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-evenly',
					alignItems: 'center',
				}}
			>
				{!!controleParasitarios.length &&
					controleParasitarios.map(
						(controleParasitario: ControleParasitario) => {
							const pet = pets.find(
								(pet: any) => pet.id === controleParasitario.petId
							);
							return (
								<Card
									variant='outlined'
									key={controleParasitario?.id}
									sx={{
										height: '150px',
										width: '200px',
										marginBottom: '20px',
										padding: '10px',
									}}
								>
									<CardContent sx={{ padding: '10px' }}>
										<Stack
											direction='row'
											justifyContent='space-between'
											alignItems='center'
										>
											{pet && (
												<Typography
													sx={{ fontSize: 24, fontWeight: 600 }}
													color='text.secondary'
													variant='h3'
													gutterBottom
												>
													{pet?.name}
												</Typography>
											)}
										</Stack>
										<Stack
											direction='row'
											justifyContent='space-between'
											alignItems='center'
										>
											<Typography
												sx={{ fontSize: 16, fontWeight: 600 }}
												color='text.primary'
												variant='h3'
												gutterBottom
											>
												{controleParasitario?.name}
											</Typography>
										</Stack>
										<Stack
											direction='column'
											justifyContent='flex-end'
											alignItems='flex-start'
											height='35px'
										>
											<Typography
												sx={{ fontSize: 15 }}
												color='text.primary'
											>
												{`Data: ${dateFormat(controleParasitario?.date)}`}
											</Typography>
										</Stack>
									</CardContent>
									<CardActions
										sx={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-evenly',
											padding: '0px',
										}}
									>
										<IconButton
											onClick={() =>
												handleOpenDeleteConfirmation(controleParasitario)
											}
										>
											<DeleteIcon sx={{ fontSize: '25px' }} />
										</IconButton>
										<IconButton
											onClick={() => handleOpenEditForm(controleParasitario)}
										>
											<EditIcon sx={{ fontSize: '25px' }} />
										</IconButton>
									</CardActions>
								</Card>
							);
						}
					)}
			</Container>
			{!!successMessage && (
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					// key={{ vertical: "top", horizontal: "right" }}
					open={!!successMessage}
					autoHideDuration={3000}
					onClose={handleCloseSnackbar}
				>
					<Alert severity='success'>Registro Salvo com Sucesso!</Alert>
				</Snackbar>
			)}
			{!!deleteSuccessMessage && (
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					open={!!deleteSuccessMessage}
					autoHideDuration={3000}
					onClose={handleCloseSnackbar}
				>
					<Alert severity='success'>Registro deletado com sucesso!</Alert>
				</Snackbar>
			)}
			{!!deleteErrorMessage && (
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					open={!!deleteErrorMessage}
					autoHideDuration={3000}
					onClose={handleCloseSnackbar}
				>
					<Alert severity='error'>Error ao excluir registro!</Alert>
				</Snackbar>
			)}
		</>
	);
};
