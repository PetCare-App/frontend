import React, {useEffect, useState} from 'react'
import { usePetCareContext } from "../../context";

import { Card, CardContent, Typography, CardActions, Button, Container, Box, IconButton, Avatar, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Vaccine } from '../../types/vaccines';

interface DashboardProps {
  handleOpenCreateForm: () => void
  handleOpenEditForm: (vaccine: Vaccine) => void
  handleOpenDeleteConfirmation: (vaccine: Vaccine) => void
}

export const Dashboard = ({handleOpenCreateForm, handleOpenEditForm, handleOpenDeleteConfirmation}: DashboardProps) => {
  const {vaccines, getVaccines} = usePetCareContext()

  useEffect(() => {getVaccines()}, [])

  console.log('vaccines :>> ', vaccines);

  const dateFormat = (date: any ) => {
    const deleteTimestamp = date?.split('T')[0]
    const day = deleteTimestamp.split('-')[2]
    const month = deleteTimestamp.split('-')[1]
    const year = deleteTimestamp.split('-')[0]

    return `${day}/${month}/${year}`
  }

  return(
    <>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '40px 0px'}}>
        <IconButton onClick={handleOpenCreateForm}>
          <AddIcon sx={{ fontSize: '30px'}}/>
        </IconButton>
      </Box>    
      <Container sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center'}}>
      {
      // !!pets.length && (
      //   pets.map((pet: Pet) => {
      //     return( 
      //     <Card variant="outlined" key={pet?.id} sx={{height: '200px', width: '200px', marginBottom: '20px', padding: '10px'}}> 
      //       <CardContent sx={{padding: '10px'}}>
      //         <Stack direction="row" justifyContent="space-between" alignItems="center">
      //           <Avatar src={pet?.animalType == 'Cat' ? Cat : pet?.animalType == 'Dog'? Dog : Paw} sx={{height: '50px', width: '50px'}}/>
      //           <Typography sx={{ fontSize: 16, fontWeight: 600 }} color="text.primary" variant='h3' gutterBottom >
      //             {pet?.name}
      //           </Typography>
      //         </Stack>
      //         <Stack direction="column" justifyContent="flex-end" alignItems="flex-start" height="100px">
      //           <Typography sx={{ fontSize: 15 }} color="text.primary" >
      //             { `Raça: ${pet?.breed}`}
      //           </Typography>
      //           <Typography sx={{ fontSize: 15 }} color="text.primary" >
      //             { `Aniversário: ${dateFormat(pet?.birthDate)}`}
      //           </Typography>
      //           <Typography sx={{ fontSize: 15 }} color="text.primary" >
      //             { `Gênero: ${pet?.gender}`}
      //           </Typography>
      //           <Typography sx={{ fontSize: 15 }} color="text.primary" >
      //             { `Peso: ${pet?.weight} Kgs`}
      //           </Typography>
      //         </Stack>
    
      //       </CardContent>
      //       <CardActions sx={{display:'flex', flexDirection: 'row', justifyContent: 'space-evenly', padding: '0px'}}>
      //       <IconButton onClick={() => handleOpenDeleteConfirmation(pet)}>
      //           <DeleteIcon sx={{ fontSize: '25px'}}/>
      //         </IconButton>
      //       <IconButton onClick={() => handleOpenEditForm(pet)}>
      //           <EditIcon sx={{ fontSize: '25px'}}/>
      //         </IconButton>
      //       </CardActions>
      //     </Card>
      //   )})
      // )
      }
      </Container>
    </>
  )
  
};
