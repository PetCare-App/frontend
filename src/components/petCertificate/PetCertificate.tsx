import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Pet } from '../../types/pets';
import { Box } from '@mui/joy';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Modal,
	Typography,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import PhotoIcon from '@mui/icons-material/Photo';
import PawPurple from './../../assets/paw-heart-purple.svg';
import PetCareLogo from './../../assets/logo.png';
import { dateFormat } from '../../utils/dateFormat';

interface PetProps {
	pet: Pet;
}

const PetCertificate: React.FC<PetProps> = ({ pet }) => {
	const imageRef = useRef<HTMLDivElement>();
	const [showImage, setShowImage] = useState(false);

	const exportImage = () => {
		if (imageRef.current) {
			html2canvas(imageRef.current).then((canvas) => {
				const dataURL = canvas.toDataURL('image/png');
				const downloadLink = document.createElement('a');
				downloadLink.href = dataURL;
				downloadLink.download = `${pet?.name}-certidao.png`;
				downloadLink.click();
				setShowImage(false);
			});
		}
	};

	const Paws = () => {
		return (
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<img
					src={PawPurple}
					style={{ width: '50px', height: '50px' }}
				/>
				<img
					src={PawPurple}
					style={{ width: '50px', height: '50px' }}
				/>
				<img
					src={PawPurple}
					style={{ width: '50px', height: '50px' }}
				/>
				<img
					src={PawPurple}
					style={{ width: '50px', height: '50px' }}
				/>
				<img
					src={PawPurple}
					style={{ width: '50px', height: '50px' }}
				/>
				<img
					src={PawPurple}
					style={{ width: '50px', height: '50px' }}
				/>
				<img
					src={PawPurple}
					style={{ width: '50px', height: '50px' }}
				/>
				<img
					src={PawPurple}
					style={{ width: '50px', height: '50px' }}
				/>
				<img
					src={PawPurple}
					style={{ width: '50px', height: '50px' }}
				/>
				<img
					src={PawPurple}
					style={{ width: '50px', height: '50px' }}
				/>
				<img
					src={PawPurple}
					style={{ width: '50px', height: '50px' }}
				/>
			</Box>
		);
	};

	const Image = () => {
		return (
			<Box
				ref={imageRef}
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr 10fr 1fr',
					height: '550px',
					width: '500px',
					padding: '10px 20px',
				}}
			>
				<Paws />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<img
						src={PetCareLogo}
						style={{ height: '150px', marginBottom: '60px' }}
					/>
					<Typography variant='h4'>{pet?.name.toUpperCase()}</Typography>

					<Box
						sx={{
							marginTop: '50px',
						}}
					>
						<Box>
							<Typography variant='body1'>
								Tipo:
								<span style={{ fontWeight: 700 }}>
									{pet?.animalType == 'Cat' ? 'Gato' : 'Cachorro'}
								</span>
							</Typography>
							<Typography variant='body1'>
								Raça: <span style={{ fontWeight: 700 }}>{pet?.breed} </span>
							</Typography>
							<Typography variant='body1'>
								Gênero: <span style={{ fontWeight: 700 }}>{pet?.gender} </span>
							</Typography>
							<Typography variant='body1'>
								Peso: <span style={{ fontWeight: 700 }}>{pet?.weight} kg </span>
							</Typography>
							<Typography variant='body1'>
								Data de nascimento:
								<span style={{ fontWeight: 700 }}>
									{dateFormat(pet.birthDate)}
								</span>
							</Typography>
						</Box>
					</Box>
				</Box>
				<Paws />
			</Box>
		);
	};

	return (
		<>
			<Button
				onClick={() => setShowImage(true)}
				startIcon={<PhotoIcon />}
				sx={{
					color: 'grey',
				}}
			>
				Certidão
			</Button>
			{showImage && (
				<Dialog
					open={showImage}
					onClose={() => setShowImage(false)}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<DialogContent>
						<Image />
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setShowImage(false)}>Fechar</Button>
						<Button
							onClick={exportImage}
							autoFocus
							startIcon={<FileDownloadIcon />}
						>
							Download
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</>
	);
};

export default PetCertificate;
