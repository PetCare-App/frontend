import React, { useEffect, useState } from "react";
import { usePetCareContext } from "../../context";

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Container,
  Box,
  IconButton,
  Avatar,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { Pet } from "../../types/pets";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Paw from "./../../assets/paw.png";
import Dog from "./../../assets/dog.png";
import Cat from "./../../assets/cat.png";
import CustomImage from "../../components/certidao-pet/CertidaoPet";

interface DashboardProps {
  handleOpenCreateForm: () => void;
  handleOpenEditForm: (pet: Pet) => void;
  handleOpenDeleteConfirmation: (pet: Pet) => void;
  handlePdf: (pet: Pet) => void;
}

export const Dashboard = ({
  handlePdf,
  handleOpenCreateForm,
  handleOpenEditForm,
  handleOpenDeleteConfirmation,
}: DashboardProps) => {
  const {
    pets,
    getPets,
    successMessage,
    setSuccessMessage,
    deleteErrorMessage,
    setDeleteErrorMessage,
    deleteSuccessMessage,
    setDeleteSuccessMessage,
    getPetPdf,
  } = usePetCareContext();

  useEffect(() => {
    getPets();
  }, []);

  const handleCloseSnackbar = () => {
    setSuccessMessage(false);
    setDeleteErrorMessage(false);
    setDeleteSuccessMessage(false);
  };

  const dateFormat = (date: any) => {
    const deleteTimestamp = date?.split("T")[0];
    const day = deleteTimestamp.split("-")[2];
    const month = deleteTimestamp.split("-")[1];
    const year = deleteTimestamp.split("-")[0];

    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          padding: "40px 0px",
        }}
      >
        <IconButton onClick={handleOpenCreateForm}>
          <AddIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Box>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {!!pets.length &&
          pets.map((pet: Pet) => {
            return (
              <Card
                variant="outlined"
                key={pet?.id}
                sx={{
                  height: "250px",
                  width: "200px",
                  marginBottom: "20px",
                  padding: "10px",
                }}
              >
                <CardContent sx={{ padding: "10px" }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Avatar
                      src={
                        pet?.animalType == "Cat"
                          ? Cat
                          : pet?.animalType == "Dog"
                          ? Dog
                          : Paw
                      }
                      sx={{ height: "50px", width: "50px" }}
                    />
                    <Typography
                      sx={{ fontSize: 16, fontWeight: 600 }}
                      color="text.primary"
                      variant="h3"
                      gutterBottom
                    >
                      {pet?.name}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                    height="100px"
                  >
                    <Typography sx={{ fontSize: 15 }} color="text.primary">
                      {`Raça: ${pet?.breed}`}
                    </Typography>
                    <Typography sx={{ fontSize: 15 }} color="text.primary">
                      {`Aniversário: ${dateFormat(pet?.birthDate)}`}
                    </Typography>
                    <Typography sx={{ fontSize: 15 }} color="text.primary">
                      {`Gênero: ${pet?.gender}`}
                    </Typography>
                    <Typography sx={{ fontSize: 15 }} color="text.primary">
                      {`Peso: ${pet?.weight} Kgs`}
                    </Typography>
                  </Stack>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    padding: "0px",
                  }}
                >
                  <IconButton onClick={() => handleOpenDeleteConfirmation(pet)}>
                    <DeleteIcon sx={{ fontSize: "25px" }} />
                  </IconButton>
                  <IconButton onClick={() => handleOpenEditForm(pet)}>
                    <EditIcon sx={{ fontSize: "25px" }} />
                  </IconButton>
                  <IconButton onClick={() => handlePdf(pet)}>
                    <PictureAsPdfIcon sx={{ fontSize: "25px" }} />
                  </IconButton>
                </CardActions>
                <CardActions>
                  <CustomImage pet={pet}></CustomImage>
                </CardActions>
              </Card>
            );
          })}
      </Container>
      {!!successMessage && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          // key={{ vertical: "top", horizontal: "right" }}
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="success">Registro Salvo com Sucesso!</Alert>
        </Snackbar>
      )}
      {!!deleteSuccessMessage && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={!!deleteSuccessMessage}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="success">Pet deletado com sucesso!</Alert>
        </Snackbar>
      )}
      {!!deleteErrorMessage && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={!!deleteErrorMessage}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="error">Error ao excluir pet!</Alert>
        </Snackbar>
      )}
    </>
  );
};
