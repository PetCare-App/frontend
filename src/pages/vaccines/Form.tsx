import { Container, Box, IconButton, Avatar, TextField, Typography, Grid, useTheme, css, Stack, Alert   } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { usePetCareContext } from '../../context';
import { Pet } from '../../types/pets';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Option from '@mui/joy/Option';
import { Select, Input, FormControl, FormLabel, Button } from '@mui/joy';
import { Vaccine } from '../../types/vaccines';


interface FormWrapperProps {
  theme: any
}

const schema = yup.object().shape({
  name: yup.string().required("Campo nome é obrigatório"),
  date: yup.string().required("Campo data obrigatório"),
  petId: yup.string().required("Campo pet obrigatório"),
});


interface FormProps {
  isCreate: boolean
  handleReturnButton: () => void
  currentVaccine: Vaccine
}

export const Form = ({isCreate, handleReturnButton, currentVaccine}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Pet>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const theme = useTheme();
  const {getPets, pets, createVaccine} = usePetCareContext()
  const [vaccine, setVaccine] = useState<Vaccine>(currentVaccine)

  useEffect(() => {getPets()}, [])

  const submitCreate = async (data: Vaccine) => {
    const response = await createVaccine(data)

    if (response?.status == 201) {
     handleReturnButton()
    }
  };

  const submitEdit = async (data: Vaccine) => {
    // const response = await updatePet(data)
    // if (response?.status === 200) {
    //   handleReturnButton()
    // }
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
          <Typography variant="h5">{!!isCreate ? "Adicione uma vacine" : "Edite as informções de uma vacina" }</Typography>
            <Stack spacing={3} direction="column" flexWrap="wrap" sx={{ 
              justifyContent: 'center',                
              marginBottom: '20px',
              }}
            >
              <FormControl>
              <FormLabel>A vacina foi administrada em qual pet?</FormLabel>
              <Select 
                placeholder="Escolha o tipo do seu pet"
                value={pets.filter((pet: Pet) => pet.id == vaccine.petId).name}  
                onChange={(_, newValue) => setVaccine({...vaccine, petId: newValue })}
                sx={{width: '250px'}}
              >
                {
                  pets.map((pet: Pet) => (<Option value={pet.id} key={pet.id}>{pet.name}</Option>))
                }
              </Select>           
            </FormControl>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input 
                {...register("name")}
                onChange={(e) => setVaccine({...vaccine, name: e.target.value})}
                value={vaccine.name}
              />              
            </FormControl>

            <FormControl>
              <FormLabel>Data de adminitração da vacina</FormLabel>
              <Input
                type="date"
                value={vaccine.date?.split('T')[0]}  

                slotProps={{
                  input: {
                    min: '2018-06-07T00:00',
                    max: '2018-06-14T00:00',
                  },
                }}
                onChange={(e) => setVaccine({...vaccine, date: e.target.value})}
              />           
            </FormControl>
          </Stack>
          <Stack>
            <Button
              color="neutral"
              variant="soft"

                onClick={() => {isCreate ? submitCreate(vaccine) : submitEdit(vaccine)}}
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
