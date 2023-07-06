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
import { Higiene } from '../../types/higiene';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { StartHere } from '../../components/startHere';
import SnackbarComponent from '../../components/snackbar/Snackbar';

interface DashboardProps {
	handleOpenCreateForm: () => void;
	handleOpenEditForm: (higiene: Higiene) => void;
	handleOpenDeleteConfirmation: (higiene: Higiene) => void;
}

export const Dashboard = ({
	handleOpenCreateForm,
	handleOpenEditForm,
	handleOpenDeleteConfirmation,
}: DashboardProps) => {
	const { higienes, getHigienes, pets, snackbarOpen } = usePetCareContext();

	useEffect(() => {
		getHigienes();
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
				{!!higienes.length ? (
					higienes.map((higiene: Higiene) => {
						const pet = pets.find((pet: any) => pet.id === higiene.petId);
						return (
							<Card
								variant='outlined'
								key={higiene?.id}
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
											{higiene?.name}
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
											{`Data: ${dateFormat(higiene?.date)}`}
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
										onClick={() => handleOpenDeleteConfirmation(higiene)}
									>
										<DeleteIcon sx={{ fontSize: '25px' }} />
									</IconButton>
									<IconButton onClick={() => handleOpenEditForm(higiene)}>
										<EditIcon sx={{ fontSize: '25px' }} />
									</IconButton>
								</CardActions>
							</Card>
						);
					})
				) : (
					<StartHere title={'Comece adicionando um serviço de higiene!'} />
				)}
			</Container>
			{!!snackbarOpen.status && <SnackbarComponent />}
		</>
	);
};
