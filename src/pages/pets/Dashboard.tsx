import React, {useEffect, useState} from 'react'
import { usePetCareContext } from "../../context";

import { Card, CardContent, Typography, CardActions, Button, Container, Box, IconButton } from '@mui/material'
import { Pet } from '../../types/pets';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

interface DashboardProps {
  handleOpenCreateForm: () => void
  handleOpenEditForm: (pet: Pet) => void
}

export const Dashboard = ({handleOpenCreateForm, handleOpenEditForm}: DashboardProps) => {
  const {pets, getPets} = usePetCareContext()

  useEffect(() => {getPets()}, [])

  return(
    <>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '40px 0px'}}>
        <IconButton onClick={handleOpenCreateForm}>
          <AddIcon sx={{ fontSize: '30px'}}/>
        </IconButton>
      </Box>    
      <Container sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center'}}>
      {
      !!pets.length && (
        pets.map((pet: Pet) => {
          return( 
          <Card variant="outlined" key={pet?.id} sx={{height: '200px', width: '200px', marginBottom: '20px'}}> 
            <CardContent >
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
                {pet?.name}
              </Typography>
            </CardContent>
            <CardActions >
            <Button size="small" >Learn More</Button>
            <IconButton onClick={() => handleOpenEditForm(pet)}>
                <EditIcon sx={{ fontSize: '20px'}}/>
              </IconButton>
            </CardActions>
          </Card>
        )})
      )
      }
      </Container>
    </>
  )
  
};
