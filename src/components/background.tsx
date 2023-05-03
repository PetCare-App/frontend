import styled from "@emotion/styled";
import {
  Box,
  Container,
  Grid,
  Paper,
  ThemeOptions,
  css,
  useTheme,
} from "@mui/material";

interface Props {
  color?: string;
  theme: any;
}

const Circle = styled(Box)<Props>`
  ${({ color, theme }) => css`
    background-color: ${color === "orange" ? "#feb06a" : "#36d6e7"};
    border-radius: 50%;
    height: 20rem;
    width: 20rem;
    margin-left: ${color === "blue" && "calc(100vw - 360px)"};
    ${theme.breakpoints.down("sm")} {
      display: none;
    }
  `}
`;

const Wrapper = styled(Container)<Props>`
  ${({ theme }) => css`
    background-color: #e4c9e5;
    height: 100vh;
    width: 100vw;
    display: grid;
    align-content: space-around;
    position: relative;
    margin: 0;
    padding: 0;

    ${theme.breakpoints.down("sm")} {
      align-content: space-between;
      padding-top: 20px;
      padding-bottom: 20px;
    }

    ${theme.breakpoints.up("sm")} {
      max-width: 100%;
    }
  `}
`;

const Card = styled(Paper)<Props>`
  ${({ theme }) => css`
    height: calc(100vh - 250px);
    width: calc(100vw - 200px);
    max-width: 1200px;
    border-radius: 20px;
    ${theme.breakpoints.down("sm")} {
      width: calc(100vw - 50px);
      height: calc(100vh - 50px);
    }
  `}
`;

const Background = ({ children }: { children: JSX.Element | any }) => {
  const theme = useTheme();

  return (
    <Wrapper theme={theme}>
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card elevation={0} theme={theme}>
          {children}
        </Card>
      </Box>
      <Circle color={"orange"} theme={theme} />
      <Circle color={"blue"} theme={theme} />
    </Wrapper>
  );
};

export default Background;
