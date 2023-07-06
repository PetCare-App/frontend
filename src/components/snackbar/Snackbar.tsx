import { Snackbar, Alert } from '@mui/material';
import { usePetCareContext } from '../../context';

const SnackbarComponent = () => {
	const { snackbarOpen, setSnackbarOpen } = usePetCareContext();
	const handleCloseSnackbar = () => {
		setSnackbarOpen({
			status: false,
			type: '',
			message: '',
		});
	};
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={!!snackbarOpen.status}
			autoHideDuration={3000}
			onClose={handleCloseSnackbar}
		>
			<Alert severity={snackbarOpen.type}>{snackbarOpen.message}</Alert>
		</Snackbar>
	);
};

export default SnackbarComponent;
