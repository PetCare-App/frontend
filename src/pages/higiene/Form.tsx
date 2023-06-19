import { Container, Box, IconButton, Avatar, TextField, Typography, Grid, useTheme, css, Stack, Alert, MenuItem   } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { usePetCareContext } from '../../context';
import { Higiene } from '../../types/higiene';

import Paw from './../../assets/paw.png'
import Dog from './../../assets/dog.png'
import Cat from './../../assets/cat.png'
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Option from '@mui/joy/Option';
import { Select, Input, FormControl, FormLabel, Button } from '@mui/joy';
import { Pet } from '../../types/pets';


interface FormWrapperProps {
  theme: any
}

const schema = yup.object().shape({
  name: yup.string().required("Campo nome é obrigatório"),
  date: yup.string(),
});


interface FormProps {
  isCreate: boolean
  handleReturnButton: () => void
  currentHigiene: Higiene
}

export const Form = ({isCreate, handleReturnButton, currentHigiene}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Higiene>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const theme = useTheme();
  const {createHigiene, updateHigiene, pets, higienes} = usePetCareContext()
  const [higiene, setHigiene] = useState<Higiene>(currentHigiene)
  const submitCreate = async (data: Higiene) => {
    const response = await createHigiene(data)

    if (response?.status == 201) {
      handleReturnButton()
    }
  };

  const submitEdit = async (data: Higiene) => {
    const response = await updateHigiene(data)
    if (response?.status === 200) {
      handleReturnButton()
    }
  };


  const handlePetChange = (event: any) => {
    const newValue = event.target.value;
    setHigiene((prevHigiene) => ({ ...prevHigiene, petId: newValue }));
  };

  return(
  <>
    <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-start', padding: '40px 0px'}}>
      <IconButton onClick={handleReturnButton}>
        <ArrowBackIcon sx={{ fontSize: '30px'}}/>
      </IconButton>
    </Box>
    <Container>
        <Container 
          sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            flexWrap: 'wrap', 
            }}
          >
          <Typography variant="h5">{!!isCreate ? "Adicione o Serviço do seu Pet" : "Edite seu pet" }</Typography>
            <Stack spacing={3} direction="column" flexWrap="wrap" sx={{ 
              justifyContent: 'center',                
              marginBottom: '20px',
              }}
            >
           <FormControl>
            <FormLabel>Pet</FormLabel>
              <Select
                placeholder="Escolha o seu pet"
                value={higiene.petId}
                onChange={handlePetChange}
                sx={{ width: '250px' }}
              >
                {pets.map((pet: any) => (
                  <MenuItem key={pet.id} value={pet.id}>
                    {pet.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Serviço</FormLabel>
              <Input 
                {...register("name")}
                onChange={(e) => setHigiene({...higiene, name: e.target.value})}
                value={higiene.name}
              />              
            </FormControl>
           
            <FormControl>
              <FormLabel>Data</FormLabel>
              <Input
                type="date"
                value={higiene.date?.split('T')[0]}  

                slotProps={{
                  input: {
                    min: '2018-06-07T00:00',
                    max: '2018-06-14T00:00',
                  },
                }}
                onChange={(e) => setHigiene({...higiene, date: e.target.value})}

              />           
            </FormControl>
          </Stack>
          <Stack>
            <Button
              color="neutral"
              variant="soft"

                onClick={() => {isCreate ? submitCreate(higiene) : submitEdit(higiene)}}
                sx={{  width: '80px', marginBottom: '20px' }}
              >
                Salvar
              </Button>
          </Stack>  
        </Container>

       
      </Container>
  </>
  )
};
