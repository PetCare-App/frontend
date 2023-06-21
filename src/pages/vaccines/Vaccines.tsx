import React, {useEffect, useState} from 'react'
import { usePetCareContext } from "../../context";

import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Form } from './Form';
import { Vaccine } from '../../types/vaccines';


export const Vaccines = () => {
  const navigate = useNavigate()
  const {vaccines, getVaccines, deletePet} = usePetCareContext()

  const [isFormOpen, setOpenForm] = useState(false)
  const [isCreate, setCreate] = useState(false)
  const [isDeleteConfirmation, setDeleteConfirmation] = useState(false)

  const [vaccine, setVaccine] = useState({} as Vaccine)

  useEffect(() => {
    !!isFormOpen &&  !!isCreate ? navigate('/vaccines/create') : 
    !!isFormOpen &&  !isCreate ? navigate('/vaccines/edit') :
     navigate('/vaccines/dashboard')
  }, [isFormOpen])

  const handleOpenCreateForm = () => {
    setVaccine({} as Vaccine)
    setOpenForm(true)
    setCreate(true)
  }

  const handleOpenEditForm = (vaccine: Vaccine) => {
    setOpenForm(true)
    setCreate(false)
    setVaccine(vaccine)
  }

  const handleOpenDeleteConfirmation = (vaccine: Vaccine) => {
    setDeleteConfirmation(true)
    setVaccine(vaccine)
  }

  const handleReturnButton = () => {
    setVaccine({} as Vaccine)
    setOpenForm(false)
    setCreate(false)
  }

  const handleDeleteVaccineButton = async (id: number) => {
    //const response = await deletePet(id)
    setDeleteConfirmation(false)
    setVaccine({} as Vaccine)
    getVaccines()

  }

  return (
    <Container sx={{display: 'flex', flexDirection:'column',}}>
      {
      !isFormOpen 
      ?
        <Dashboard handleOpenCreateForm={handleOpenCreateForm} handleOpenEditForm={handleOpenEditForm} handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}/>  
      :
        <Form isCreate={isCreate} handleReturnButton={handleReturnButton} currentVaccine={vaccine}></Form>
       }

       {
        !!isDeleteConfirmation && (
          <Dialog open={isDeleteConfirmation} onClose={() => setDeleteConfirmation(false)}>
          <DialogTitle>Deletar pet</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Você confirma que gostaria de deletar o pet?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmation(false)}>Cancelar</Button>
            <Button onClick={() => handleDeleteVaccineButton(vaccine.id)}>Deletar</Button>
          </DialogActions>
        </Dialog>
        )
       }
    </Container>
  )
};
