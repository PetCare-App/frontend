import {
	Container,
	Box,
	IconButton,
	Typography,
	useTheme,
	Stack,
	Snackbar,
	Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { usePetCareContext } from '../../context';
import { useState, useEffect } from 'react';
import Option from '@mui/joy/Option';
import { Select, Input, FormControl, FormLabel, Button } from '@mui/joy';
import { Pet } from '../../types/pets';
import { ControleParasitario } from '../../types/controleParasitario';

interface FormWrapperProps {
	theme: any;
}

const schema = yup.object().shape({
	name: yup.string().required('Campo nome é obrigatório'),
	date: yup.string(),
});

interface FormProps {
	isCreate: boolean;
	handleReturnButton: () => void;
	currentControleParasitario: ControleParasitario;
}

export const Form = ({
	isCreate,
	handleReturnButton,
	currentControleParasitario,
}: FormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ControleParasitario>({
		mode: 'onChange',
		resolver: yupResolver(schema),
	});
	const theme = useTheme();
	const {
		createControleParasitario,
		updateControleParasitario,
		pets,
		errorMessage,
		setErrorMessage,
	} = usePetCareContext();
	const [controleParasitario, setControleParasitario] =
		useState<ControleParasitario>(currentControleParasitario);
	const submitCreate = async (data: ControleParasitario) => {
		const response = await createControleParasitario(data);

		if (response?.status == 201) {
			handleReturnButton();
		}
	};

	const handleCloseSnackbar = () => {
		setErrorMessage(false);
	};

	const submitEdit = async (data: ControleParasitario) => {
		const response = await updateControleParasitario(data);
		if (response?.status === 200) {
			handleReturnButton();
		}
	};

	return (
		<>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'flex-start',
					padding: '40px 0px',
				}}
			>
				<IconButton onClick={handleReturnButton}>
					<ArrowBackIcon sx={{ fontSize: '30px' }} />
				</IconButton>
			</Box>
			<Container>
				<Container
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						flexWrap: 'wrap',
					}}
				>
					<Typography variant='h5'>
						{!!isCreate ? 'Adicione o Serviço do seu Pet' : 'Edite seu pet'}
					</Typography>
					<Stack
						spacing={3}
						direction='column'
						flexWrap='wrap'
						sx={{
							justifyContent: 'center',
							marginBottom: '20px',
						}}
					>
						<FormControl>
							<FormLabel>Pet</FormLabel>
							<Select
								placeholder='Escolha o seu pet'
								value={controleParasitario.petId}
								onChange={(_, e: any) => {
									setControleParasitario({ ...controleParasitario, petId: e });
								}}
							>
								{pets.map((pet: Pet) => (
									<Option
										key={pet.id}
										value={pet.id}
									>
										{pet.name}
									</Option>
								))}
							</Select>
						</FormControl>
						<FormControl>
							<FormLabel>Serviço</FormLabel>
							<Input
								{...register('name')}
								onChange={(e) =>
									setControleParasitario({
										...controleParasitario,
										name: e.target.value,
									})
								}
								value={controleParasitario.name}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Data</FormLabel>
							<Input
								type='date'
								value={controleParasitario.date?.split('T')[0]}
								slotProps={{
									input: {
										min: '2018-06-07T00:00',
										max: '2018-06-14T00:00',
									},
								}}
								onChange={(e) =>
									setControleParasitario({
										...controleParasitario,
										date: e.target.value,
									})
								}
							/>
						</FormControl>
					</Stack>
					<Stack>
						<Button
							color='neutral'
							variant='soft'
							onClick={() => {
								isCreate
									? submitCreate(controleParasitario)
									: submitEdit(controleParasitario);
							}}
							sx={{ width: '80px', marginBottom: '20px' }}
						>
							Salvar
						</Button>
					</Stack>
				</Container>
			</Container>
			{!!errorMessage && (
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					// key={{ vertical: "top", horizontal: "right" }}
					open={!!errorMessage}
					autoHideDuration={3000}
					onClose={handleCloseSnackbar}
				>
					<Alert severity='error'>Error ao editar registro!</Alert>
				</Snackbar>
			)}
		</>
	);
};
