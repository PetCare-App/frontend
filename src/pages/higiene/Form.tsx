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
import { Higiene } from "../../types/higiene";
import { useState, useEffect } from "react";
import Option from "@mui/joy/Option";
import { Select, Input, FormControl, FormLabel, Button } from "@mui/joy";
import { Pet } from "../../types/pets";

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
  currentHigiene: Higiene;
}

export const Form = ({
  isCreate,
  handleReturnButton,
  currentHigiene,
}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Higiene>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const theme = useTheme();
  const { createHigiene, updateHigiene, pets, errorMessage, setErrorMessage } =
    usePetCareContext();
  const [higiene, setHigiene] = useState<Higiene>(currentHigiene);
  const submitCreate = async (data: Higiene) => {
    const response = await createHigiene(data);

    if (response?.status == 201) {
      handleReturnButton();
    }
  };

  const submitEdit = async (data: Higiene) => {
    const response = await updateHigiene(data);
    if (response?.status === 200) {
      handleReturnButton();
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(false);
  };

  const handlePetChange = (event: any) => {
    const newValue = event.target.value;
    setHigiene((prevHigiene) => ({ ...prevHigiene, petId: newValue }));
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
            {!!isCreate ? "Adicione o Serviço do seu Pet" : "Edite seu pet"}
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
                value={higiene.petId}
                onChange={(_, e: any) => {
                  setHigiene({ ...higiene, petId: e });
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
              <FormLabel>Serviço</FormLabel>
              <Input
                {...register("name")}
                onChange={(e) =>
                  setHigiene({ ...higiene, name: e.target.value })
                }
                value={higiene.name}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Data</FormLabel>
              <Input
                type="date"
                value={higiene.date?.split("T")[0]}
                slotProps={{
                  input: {
                    min: "2018-06-07T00:00",
                    max: "2018-06-14T00:00",
                  },
                }}
                onChange={(e) =>
                  setHigiene({ ...higiene, date: e.target.value })
                }
              />
            </FormControl>
          </Stack>
          <Stack>
            <Button
              color="neutral"
              variant="soft"
              onClick={() => {
                isCreate ? submitCreate(higiene) : submitEdit(higiene);
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
          <Alert severity="error">Error ao salvar higiene!</Alert>
        </Snackbar>
      )}
    </>
  );
};
