import React, { useEffect, useState } from "react";
import { usePetCareContext } from "../../context";

import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Form } from "./Form";
import { ControleParasitario } from "../../types/controleParasitario";

export const PetsControleParasitario = () => {
  const navigate = useNavigate();
  const {
    controleParasitarios,
    getControleParasitarios,
    deleteControleParasitario,
  } = usePetCareContext();

  const [isFormOpen, setOpenForm] = useState(false);
  const [isCreate, setCreate] = useState(false);
  const [isDeleteConfirmation, setDeleteConfirmation] = useState(false);

  const [controleParasitario, setControleParasitario] = useState(
    {} as ControleParasitario
  );

  useEffect(() => {
    getControleParasitarios();
  }, []);

  useEffect(() => {
    !!isFormOpen && !!isCreate
      ? navigate("/controleParasitarios/create")
      : !!isFormOpen && !isCreate
      ? navigate("/controleParasitarios/edit")
      : navigate("/controleParasitarios/dashboard");
  }, [isFormOpen]);

  const handleOpenCreateForm = () => {
    setControleParasitario({} as ControleParasitario);
    setOpenForm(true);
    setCreate(true);
  };

  const handleOpenEditForm = (controleParasitario: ControleParasitario) => {
    setOpenForm(true);
    setCreate(false);
    setControleParasitario(controleParasitario);
  };

  const handleOpenDeleteConfirmation = (
    controleParasitario: ControleParasitario
  ) => {
    setDeleteConfirmation(true);
    setControleParasitario(controleParasitario);
  };

  const handleReturnButton = () => {
    setControleParasitario({} as ControleParasitario);
    setOpenForm(false);
    setCreate(false);
  };

  const handleDeleteControleParasitarioButton = async (id: string) => {
    const response = await deleteControleParasitario(id);
    setDeleteConfirmation(false);
    setControleParasitario({} as ControleParasitario);
    getControleParasitarios();
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      {!isFormOpen ? (
        <Dashboard
          handleOpenCreateForm={handleOpenCreateForm}
          handleOpenEditForm={handleOpenEditForm}
          handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}
        />
      ) : (
        <Form
          isCreate={isCreate}
          handleReturnButton={handleReturnButton}
          currentControleParasitario={controleParasitario}
        ></Form>
      )}

      {!!isDeleteConfirmation && (
        <Dialog
          open={isDeleteConfirmation}
          onClose={() => setDeleteConfirmation(false)}
        >
          <DialogTitle>Deletar pet</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Você confirma que gostaria de deletar o pet?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmation(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() =>
                handleDeleteControleParasitarioButton(controleParasitario.id)
              }
            >
              Deletar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};
