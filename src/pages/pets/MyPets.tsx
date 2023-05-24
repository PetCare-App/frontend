import React, {useEffect, useState} from 'react'
import { usePetCareContext } from "../../context";

import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Form } from './Form';
import { Pet } from '../../types/pets';


export const MyPets = () => {
  const navigate = useNavigate()
  const {pets, getPets, deletePet} = usePetCareContext()

  const [isFormOpen, setOpenForm] = useState(false)
  const [isCreate, setCreate] = useState(false)
  const [isDeleteConfirmation, setDeleteConfirmation] = useState(false)

  const [pet, setPet] = useState({} as Pet)

  useEffect(() => {getPets()}, [])


  useEffect(() => {
    !!isFormOpen &&  !!isCreate ? navigate('/pets/create') : 
    !!isFormOpen &&  !isCreate ? navigate('/pets/edit') :
     navigate('/pets/dashboard')
  }, [isFormOpen])

  const handleOpenCreateForm = () => {
    setPet({} as Pet)
    setOpenForm(true)
    setCreate(true)
  }

  const handleOpenEditForm = (pet: Pet) => {
    setOpenForm(true)
    setCreate(false)
    setPet(pet)
  }

  const handleOpenDeleteConfirmation = (pet: Pet) => {
    setDeleteConfirmation(true)
    setPet(pet)
  }

  const handleReturnButton = () => {
    setPet({} as Pet)
    setOpenForm(false)
    setCreate(false)
  }

  const handleDeletePetButton = async (id: string) => {
    const response = await deletePet(id)
    setDeleteConfirmation(false)
    setPet({} as Pet)
    getPets()

  }

  return (
    <Container sx={{display: 'flex', flexDirection:'column',}}>
      {
      !isFormOpen 
      ?
        <Dashboard handleOpenCreateForm={handleOpenCreateForm} handleOpenEditForm={handleOpenEditForm} handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}/>  
      :
        <Form isCreate={isCreate} handleReturnButton={handleReturnButton} currentPet={pet}></Form>
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
            <Button onClick={() => handleDeletePetButton(pet.id)}>Deletar</Button>
          </DialogActions>
        </Dialog>
        )
       }
    </Container>
  )
};
