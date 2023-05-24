import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import sobrenosImg from "../../assets/sobrenos.png";

const Details = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(10),
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const LargeText = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000",
    fontWeight: "700",
    [theme.breakpoints.down("md")]: {
      fontSize: "32px",
    },
  }));

  const SmallText = styled(Typography)(({ theme }) => ({
    fontSize: "18px",
    color: "#7B8087",
    fontWeight: "500",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  }));

  const TextFlexbox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(7),
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 5, 0, 5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(5),
    },
  }));

  const Divider = styled("div")(({ theme }) => ({
    width: "13%",
    height: "5px",
    backgroundColor: "#000339",
    [theme.breakpoints.down("md")]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  }));

  return (
    <Box id="sobrenos" sx={{ py: 10 }}>
      <Container>
        <CustomBox>
          <ImgContainer>
            <img src={sobrenosImg} alt="pets" style={{ maxWidth: "100%" }} />
          </ImgContainer>

          <Box>
            <Divider />
            <Typography
              sx={{
                fontSize: "30px",
                color: "#000339",
                fontWeight: "700",
                my: 3,
              }}
            >
              O PetCare te ajuda a cuidar do seu pet para vocês aproveitarem
              mais tempo juntos!
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                color: "#5A6473",
                lineHeight: "27px",
              }}
            >
              O PetCare cria e fornece soluções tecnológicas e inovadoras para
              facilitar o dia a dia de pessoas que possuem animais de estimação,
              tornando mais fácil o acompanhamento de informações sobre seu pet
              entre outros serviços.
            </Typography>
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Details;
