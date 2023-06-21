import styled from '@emotion/styled';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
} from '@mui/material';
import LogoImage from './../../assets/logo.png';
import { MenuProps } from './types';

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
    <Menu flexDirection="column" width="200px">
      <Logo src={LogoImage} />
      <ListItem>
        <ListItemButton onClick={() => setContent(1)}>Meus Pets</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => setContent(2)}>Vacinas</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => setContent(3)}>opção 3</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => setContent(4)}>opção 4</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => setContent(5)}>opção 5</ListItemButton>
      </ListItem>
    </Menu>
  );
};
