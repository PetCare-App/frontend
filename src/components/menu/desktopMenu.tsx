import styled from '@emotion/styled';
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	MenuItem,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LogoImage from './../../assets/logo.png';
import { MenuProps } from './types';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { border } from '@mui/system';

const Menu = styled(Box)`
	display: flex;
	width: 200px;
	align-items: center;
	margin: 0px;
`;

const Logo = styled('img')`
	height: 80px;
	width: 100px;
	padding: 20px;
`;

export const DesktopMenu = ({ content, setContent }: MenuProps) => {
	return (
		<Menu
			position='relative'
			flexDirection='column'
			width='200px'
		>
			<Logo src={LogoImage} />
			<ListItem>
				<ListItemButton onClick={() => setContent(1)}>Meus Pets</ListItemButton>
			</ListItem>
			<ListItem>
				<ListItemButton onClick={() => setContent(2)}>Vacinas</ListItemButton>
			</ListItem>
			<ListItem>
				<ListItemButton onClick={() => setContent(3)}>Higiene</ListItemButton>
			</ListItem>
			<ListItem>
				<ListItemButton onClick={() => setContent(4)}>
					Controle Parasitário
				</ListItemButton>
			</ListItem>
			<ListItem style={{ position: 'absolute', bottom: '0px' }}>
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
						onClick={() => setContent(6)}
					>
						<PersonIcon fontSize='large' />
					</ListItemButton>
				</ListItem>
			</ListItem>
		</Menu>
	);
};
