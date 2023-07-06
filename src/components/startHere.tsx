import { Box, Typography } from '@mui/joy';
import Paw from './../assets/paw.png';

export const StartHere = ({ title }: { title: string }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<img
				src={Paw}
				style={{ height: '200px' }}
			/>
			<Typography style={{ fontSize: '20px', fontWeight: 700 }}>
				{title}
			</Typography>
		</Box>
	);
};
