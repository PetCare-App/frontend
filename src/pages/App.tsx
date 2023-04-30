import {
  Box,
  IconButton,
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

const Logo = styled('img')`
  height: 60px;
  width: auto;
`;

function App() {
  const theme = useTheme<Theme>();

  const [isMobile, setIsMobile] = useState(false);
  const [content, setContent] = useState(1);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuButton = () => {
    !!isMenuOpen ? setMenuOpen(false) : setMenuOpen(true);
  };
  console.log('isMenuOpen', isMenuOpen);

  return (
    <>
      <Background>
        <Box
          display="flex"
          flexDirection={!isMobile ? 'row' : 'column'}
          height="100%"
        >
          {!isMobile ? (
            <DesktopMenu content={content} setContent={setContent} />
          ) : (
            <>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                padding="10px"
              >
                <Logo src={LogoImage} />
                <IconButton color="inherit" onClick={handleMenuButton}>
                  <MenuIcon />
                </IconButton>
              </Box>
              {!!isMenuOpen && (
                <Menu
                  open={isMenuOpen}
                  onClose={() => setMenuOpen(false)}
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
                    Início
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setContent(2);
                      setMenuOpen(false);
                    }}
                  >
                    Meus pets
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setContent(3);
                      setMenuOpen(false);
                    }}
                  >
                    opção 3
                  </MenuItem>
                </Menu>
              )}
            </>
          )}
          <div>content {content}</div>
        </Box>
      </Background>
    </>
  );
}

export default App;
