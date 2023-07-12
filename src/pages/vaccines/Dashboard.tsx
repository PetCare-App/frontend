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
	CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Vaccine } from '../../types/vaccines';
import { Pet } from '../../types/pets';
import { StartHere } from '../../components/startHere';
import SnackbarComponent from '../../components/snackbar/Snackbar';
import { dateFormat } from '../../utils/dateFormat';
import { FilterByPet } from '../../components/FilterByPet';

interface DashboardProps {
	handleOpenCreateForm: () => void;
	handleOpenEditForm: (vaccine: Vaccine) => void;
	handleOpenDeleteConfirmation: (vaccine: Vaccine) => void;
}

export const Dashboard = ({
	handleOpenCreateForm,
	handleOpenEditForm,
	handleOpenDeleteConfirmation,
}: DashboardProps) => {
	const { vaccines, getVaccines, pets, snackbarOpen, setVaccines } =
		usePetCareContext();

	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		await getVaccines(pets.map((pet: Pet) => pet.id));
		setLoading(false);
	};

	const handleFilter = async (filter: number) => {
		setLoading(true);
		await getVaccines(filter !== 0 ? [filter] : pets.map((pet: Pet) => pet.id));
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					padding: '40px 0px',
				}}
			>
				<FilterByPet handleFilter={handleFilter} />
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
				{!!vaccines.length && !loading ? (
					vaccines.map((vaccine: Vaccine) => {
						const pet = pets.find((pet: any) => pet.id === vaccine.petId);
						return (
							// <Card
							// 	variant='outlined'
							// 	key={vaccine?.id}
							// 	sx={{
							// 		height: '200px',
							// 		width: '200px',
							// 		marginBottom: '20px',
							// 		padding: '10px',
							// 	}}
							// >
							// 	<CardContent sx={{ padding: '10px' }}>
							// 		<Stack
							// 			direction='row'
							// 			justifyContent='space-between'
							// 			alignItems='center'
							// 		>
							// 			{pet && (
							// 				<Typography
							// 					sx={{ fontSize: 24, fontWeight: 600 }}
							// 					color='text.secondary'
							// 					variant='h3'
							// 					gutterBottom
							// 				>
							// 					{pet?.name}
							// 				</Typography>
							// 			)}
							// 		</Stack>
							// 		<Stack
							// 			direction='row'
							// 			justifyContent='space-between'
							// 			alignItems='center'
							// 		>
							// 			<Typography
							// 				sx={{ fontSize: 16, fontWeight: 600 }}
							// 				color='text.primary'
							// 				variant='h3'
							// 				gutterBottom
							// 			>
							// 				{vaccine?.name}
							// 			</Typography>
							// 		</Stack>
							// 		<Stack
							// 			direction='column'
							// 			justifyContent='flex-end'
							// 			alignItems='flex-start'
							// 			height='35px'
							// 		>
							// 			<Typography
							// 				sx={{ fontSize: 15 }}
							// 				color='text.primary'
							// 			>
							// 				{`Data: ${dateFormat(vaccine.date)}`}
							// 			</Typography>
							// 		</Stack>
							// 	</CardContent>
							// 	<CardActions
							// 		sx={{
							// 			display: 'flex',
							// 			flexDirection: 'row',
							// 			justifyContent: 'space-evenly',
							// 			padding: '0px',
							// 		}}
							// 	>
							// 		<IconButton
							// 			onClick={() => handleOpenDeleteConfirmation(vaccine)}
							// 		>
							// 			<DeleteIcon sx={{ fontSize: '25px' }} />
							// 		</IconButton>
							// 		<IconButton onClick={() => handleOpenEditForm(vaccine)}>
							// 			<EditIcon sx={{ fontSize: '25px' }} />
							// 		</IconButton>
							// 	</CardActions>
							// </Card>
							<Card
								variant='outlined'
								key={vaccine?.id}
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
											{vaccine?.name}
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
											{`Data: ${dateFormat(vaccine.date)}`}
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
										onClick={() => handleOpenDeleteConfirmation(vaccine)}
									>
										<DeleteIcon sx={{ fontSize: '25px' }} />
									</IconButton>
									<IconButton onClick={() => handleOpenEditForm(vaccine)}>
										<EditIcon sx={{ fontSize: '25px' }} />
									</IconButton>
								</CardActions>
							</Card>
						);
					})
				) : !vaccines.length && !loading ? (
					<StartHere title={'Comece adicionando seu registro de vacina!'} />
				) : (
					<CircularProgress color='secondary' />
				)}
			</Container>
			{!!snackbarOpen.status && <SnackbarComponent />}
		</>
	);
};
