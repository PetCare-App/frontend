import React, {useEffect, useState} from 'react'
import { usePetCareContext } from "../../context";

import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Form } from './Form';
import { Pet } from '../../types/pets';


export const MyPets = () => {
  const navigate = useNavigate()
  const {pets, getPets} = usePetCareContext()

  const [isFormOpen, setOpenForm] = useState(false)
  const [isCreate, setCreate] = useState(false)
  const [pet, setPet] = useState({} as Pet)


  useEffect(() => {
    getPets()
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

  const handleReturnButton = () => {
    setPet({} as Pet)
    setOpenForm(false)
    setCreate(false)
  }

  return (
    <Container sx={{display: 'flex', flexDirection:'column',}}>
      {
      !isFormOpen 
      ?
        <Dashboard handleOpenCreateForm={handleOpenCreateForm} handleOpenEditForm={handleOpenEditForm}/>  
      :
        <Form isCreate={isCreate} handleReturnButton={handleReturnButton} currentPet={pet}></Form>
       }
    </Container>
  )
};
