import {
	Box,
	IconButton,
	ListItem,
	ListItemButton,
	Menu,
	MenuItem,
	Theme,
	useTheme,
} from '@mui/material';
import Background from '../components/background';
import { DesktopMenu } from '../components/menu/desktopMenu';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled';
import LogoImage from './../assets/logo.png';
import { MyPets } from './pets/MyPets';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePetCareContext } from '../context';
import { Users } from './users/Users';
import { PetsHigiene } from './higiene/Higiene';
import { PetsControleParasitario } from './controleParasitario/ControleParasitario';
import { PetsVaccine } from './vaccines/Vaccines';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';

const Logo = styled('img')`
	height: 60px;
	width: auto;
`;

function App() {
	const theme = useTheme<Theme>();
	const navigate = useNavigate();

	const { getUser, user } = usePetCareContext();
	const [isMobile, setIsMobile] = useState(false);
	const [content, setContent] = useState(1);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	useEffect(() => {
		const handleResize = () => {
			if (window.screen.width > 600) setIsMobile(false);
			else setIsMobile(true);
		};
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, [isMobile]);

	const handleMenuButton = (event: any) => {
		setAnchorEl(event.currentTarget);

		!!isMenuOpen ? setMenuOpen(false) : setMenuOpen(true);
	};

	useEffect(() => {
		if (content == 1) navigate('/pets');
		if (content == 2) navigate('/vacinas');
		if (content == 3) navigate('/higiene');
		if (content == 4) navigate('/controle-parasitario');
		if (content == 6) navigate('/usuario/edit');
	}, [content]);

	useEffect(() => {
		getUser();
	}, []);

	return (
		<>
			<Background>
				<Box
					display='flex'
					flexDirection={!isMobile ? 'row' : 'column'}
					height='100%'
				>
					{!isMobile ? (
						<DesktopMenu
							content={content}
							setContent={setContent}
						/>
					) : (
						<>
							<Box
								display='flex'
								flexDirection='row'
								justifyContent='space-between'
								padding='10px'
							>
								<Logo src={LogoImage} />
								<IconButton
									color='inherit'
									onClick={handleMenuButton}
								>
									<MenuIcon />
								</IconButton>
							</Box>
							{!!isMenuOpen && (
								<Menu
									open={isMenuOpen}
									onClose={() => {
										setAnchorEl(null);
										setMenuOpen(false);
									}}
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
								>
									<MenuItem
										onClick={() => {
											setContent(1);
											setMenuOpen(false);
										}}
									>
										Meus pets
									</MenuItem>
									<MenuItem
										onClick={() => {
											setContent(2);
											setMenuOpen(false);
										}}
									>
										Vacinas
									</MenuItem>
									<MenuItem
										onClick={() => {
											setContent(3);
											setMenuOpen(false);
										}}
									>
										Higiene
									</MenuItem>
									<MenuItem
										onClick={() => {
											setContent(4);
											setMenuOpen(false);
										}}
									>
										Controle parasitário
									</MenuItem>
									<MenuItem>
									<ListItemButton
									style={{ display: 'flex', justifyContent: 'center' }}
									component={Link}
									to='/login'
								>
									{' '}
									<IconButton
										color='inherit'
										aria-label='Logout'
									>
										<ExitToAppIcon />
									</IconButton>
									</ListItemButton>
									<ListItem>
									<ListItemButton
										style={{ display: 'flex', justifyContent: 'center' }}
										onClick={() => {setContent(6);
														setMenuOpen(false);}}
									>
										<PersonIcon fontSize='large' />
									</ListItemButton>
									</ListItem>
									</MenuItem>
								</Menu>
							)}
						</>
					)}
					{content == 1 ? (
						<MyPets />
					) : content == 2 ? (
						<PetsVaccine />
					) : content == 3 ? (
						<PetsHigiene />
					) : content == 4 ? (
						<PetsControleParasitario />
					) : content == 6 ? (
						<Users />
					) : (
						<div> Página {content} ainda em construção</div>
					)}
				</Box>
			</Background>
		</>
	);
}

export default App;
