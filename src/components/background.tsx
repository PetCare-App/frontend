import styled from '@emotion/styled';
import { Box, Container, Grid, Paper, css, useTheme } from '@mui/material';

const Background = ({ children }: { children: JSX.Element | any }) => {
  const theme = useTheme();

  const Wrapper = styled(Container)`
    background-color: #e4c9e5;
    height: 100vh;
    width: 100vw;
    display: grid;
    align-content: space-around;
    position: relative;

    ${theme.breakpoints.down('sm')} {
      align-content: space-between;
      padding-top: 20px;
      padding-bottom: 20px;
    }
  `;

  const Circle = styled(Box)<{ color: string }>`
    background-color: ${(props) =>
      props.color === 'orange' ? '#feb06a' : '#36d6e7'};
    border-radius: 50%;
    height: 20rem;
    width: 20rem;
    margin-left: ${(props) => props.color === 'blue' && 'calc(100vw - 360px)'};
    ${theme.breakpoints.down('sm')} {
      height: 10rem;
      width: 10rem;
      margin-left: ${(props) =>
        props.color === 'blue' && 'calc(100vw - 190px)'};
    }
  `;

  const Card = styled(Paper)`
    height: calc(100vh - 250px);
    width: calc(100vw - 200px);
    ${theme.breakpoints.down('sm')} {
      width: calc(100vw - 100px);
      height: calc(100vh - 100px);
    }
  `;

  return (
    <Wrapper>
      <Box
        sx={{
          position: 'absolute',
          zIndex: 1,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card elevation={0}>{children}</Card>
      </Box>
      <Circle color={'orange'} />
      <Circle color={'blue'} />
    </Wrapper>
  );
};

export default Background;
