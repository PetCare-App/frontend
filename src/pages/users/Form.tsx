import {
	Container,
	Box,
	useTheme,
	Stack,
	Alert,
	Snackbar,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { usePetCareContext } from '../../context';
import { User } from '../../types/users';
import { useState, useEffect } from 'react';
import { Input, FormControl, FormLabel, Button } from '@mui/joy';
import SnackbarComponent from '../../components/snackbar/Snackbar';

const schema = yup.object().shape({
	fullname: yup.string().required('Campo nome completo é obrigatório'),
	email: yup.string(),
});

interface FormProps {
	currentUser?: User;
}

export const Form = ({}: FormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
	} = useForm<User>({
		mode: 'onChange',
		resolver: yupResolver(schema),
	});
	const theme = useTheme();
	const { updateUser, user: currentUser, snackbarOpen } = usePetCareContext();

	const [user, setUser] = useState<User>(currentUser);

	useEffect(() => {
		setValue('fullname', currentUser.fullname);
		setValue('email', currentUser.email);
	}, [currentUser, setValue]);

	const submitEdit = async (data: User) => {
		const response = await updateUser(data);
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
			></Box>
			<Container>
				<Container
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						flexWrap: 'wrap',
					}}
				>
					<FormControl>
						<FormLabel>Nome Completo</FormLabel>
						<Input
							{...register('fullname')}
							onChange={(e) => setUser({ ...user, fullname: e.target.value })}
							value={user.fullname}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Email</FormLabel>
						<Input
							{...register('email')}
							value={user.email}
							onChange={(e) => setUser({ ...user, email: e.target.value })}
						/>
					</FormControl>

					<Stack>
						<Button
							color='neutral'
							variant='soft'
							onClick={() => {
								submitEdit(user);
							}}
							sx={{ width: '80px', marginTop: '10px' }}
						>
							Salvar
						</Button>
					</Stack>
				</Container>
			</Container>
			{!!snackbarOpen.status && <SnackbarComponent />}
		</>
	);
};
