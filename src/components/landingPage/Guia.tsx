import { Box, Typography, styled } from "@mui/material";
import React from "react";

import petsIcon from "../../assets/pets.png";
import reportIcon from "../../assets/report.png";
import veterinarialIcon from "../../assets/veterinarian.png";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

const Guide: React.FC = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "85%",
    },
  }));

  const GuidesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    width: "70%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0",
      flexDirection: "column",
    },
  }));

  const GuideBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  return (
    <Box
      id="guide"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "5%",
          height: "5px",
          backgroundColor: "#000339",
          margin: "0 auto",
        }}
      ></div>

      <Typography
        variant="h3"
        sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3 }}
      >
        Como funciona?
      </Typography>

      <CustomBox>
        <Typography
          variant="body2"
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#5A6473",
            textAlign: "center",
          }}
        >
          Tudo o que você precisa saber quando quer cuidar do seu Pet - Tudo em
          um só lugar
        </Typography>
      </CustomBox>

      <GuidesBox>
        <GuideBox>
          <img src={petsIcon} alt="petsIcon" style={{ width: "60px" }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Cadastre seu Pet
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
        </GuideBox>

        <GuideBox>
          <img
            src={veterinarialIcon}
            alt="veterinarialIcon"
            style={{ width: "50px" }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Acompanhe seu Pet
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
        </GuideBox>

        <GuideBox>
          <img src={reportIcon} alt="reportIcon" style={{ width: "50px" }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Quadro de Vacinas
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
        </GuideBox>
      </GuidesBox>

      <Link to="/signup">
        <CustomButton
          backgroundColor="#0F1B4C"
          color="#fff"
          buttonText="Cadastre-se já!"
          guideBtn={true}
        />
      </Link>
    </Box>
  );
};

export default Guide;
