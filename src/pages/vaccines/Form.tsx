import {
  Container,
  Box,
  IconButton,
  Typography,
  useTheme,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { usePetCareContext } from "../../context";
import { useState, useEffect } from "react";
import Option from "@mui/joy/Option";
import { Select, Input, FormControl, FormLabel, Button } from "@mui/joy";
import { Pet } from "../../types/pets";
import { Vaccine } from "../../types/vaccines";

interface FormWrapperProps {
  theme: any;
}

const schema = yup.object().shape({
  name: yup.string().required("Campo nome é obrigatório"),
  date: yup.string(),
});

interface FormProps {
  isCreate: boolean;
  handleReturnButton: () => void;
  currentVaccine: Vaccine;
}

export const Form = ({
  isCreate,
  handleReturnButton,
  currentVaccine,
}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Vaccine>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const theme = useTheme();
  const { createVaccine, updateVaccine, pets, errorMessage, setErrorMessage } =
    usePetCareContext();
  const [vaccine, setVaccine] = useState<Vaccine>(currentVaccine);
  const submitCreate = async (data: Vaccine) => {
    const response = await createVaccine(data);

    if (response?.status == 201) {
      handleReturnButton();
    }
  };

  const submitEdit = async (data: Vaccine) => {
    const response = await updateVaccine(data);
    if (response?.status === 200) {
      handleReturnButton();
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(false);
  };

  const handlePetChange = (event: any) => {
    const newValue = event.target.value;
    setVaccine((prevVaccine) => ({ ...prevVaccine, petId: newValue }));
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          padding: "40px 0px",
        }}
      >
        <IconButton onClick={handleReturnButton}>
          <ArrowBackIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Box>
      <Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h5">
            {!!isCreate ? "Adicione a vacina do seu pet" : "Edite a vacina do pet"}
          </Typography>
          <Stack
            spacing={3}
            direction="column"
            flexWrap="wrap"
            sx={{
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <FormControl>
              <FormLabel>Pet</FormLabel>
              <Select
                placeholder="Escolha o seu pet"
                value={vaccine.petId}
                onChange={(_, e: any) => {
                  setVaccine({ ...vaccine, petId: e });
                }}
              >
                {pets.map((pet: Pet) => (
                  <Option key={pet.id} value={pet.id}>
                    {pet.name}
                  </Option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Nome da vacina</FormLabel>
              <Input
                {...register("name")}
                onChange={(e) =>
                  setVaccine({ ...vaccine, name: e.target.value })
                }
                value={vaccine.name}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Data</FormLabel>
              <Input
                type="date"
                value={vaccine.date?.split("T")[0]}
                slotProps={{
                  input: {
                    min: "2018-06-07T00:00",
                    max: "2018-06-14T00:00",
                  },
                }}
                onChange={(e) =>
                  setVaccine({ ...vaccine, date: e.target.value })
                }
              />
            </FormControl>
          </Stack>
          <Stack>
            <Button
              color="neutral"
              variant="soft"
              onClick={() => {
                isCreate ? submitCreate(vaccine) : submitEdit(vaccine);
              }}
              sx={{ width: "80px", marginBottom: "20px" }}
            >
              Salvar
            </Button>
          </Stack>
        </Container>
      </Container>
      {!!errorMessage && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          // key={{ vertical: "top", horizontal: "right" }}
          open={!!errorMessage}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="error">Error ao salvar Vacina!</Alert>
        </Snackbar>
      )}
    </>
  );
};
