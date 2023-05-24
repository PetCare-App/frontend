import { Container, Box, IconButton, Avatar, TextField, Typography, Grid, useTheme, css, Stack,   } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { usePetCareContext } from '../../context';
import { Pet } from '../../types/pets';

import Paw from './../../assets/paw.png'
import Dog from './../../assets/dog.png'
import Cat from './../../assets/cat.png'
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Option from '@mui/joy/Option';
import { Select, Input, FormControl, FormLabel, Alert, Button } from '@mui/joy';


interface FormWrapperProps {
  theme: any
}

const schema = yup.object().shape({
  name: yup.string().required("Campo nome é obrigatório"),
  animalType: yup.string(),
  breed: yup.string().required("Campo raça obrigatório"),
  gender: yup.string().required("Campo genero obrigatório"),
  weight: yup.number(),
  birthday: yup.string(),
});


interface FormProps {
  isCreate: boolean
  handleReturnButton: () => void
  currentPet: Pet
}

export const Form = ({isCreate, handleReturnButton, currentPet}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Pet>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const theme = useTheme();
  const {createPet, updatePet} = usePetCareContext()
  const [pet, setPet] = useState<Pet>(currentPet)

  const submitCreate = async (data: Pet) => {
    const response = await createPet(data)

    if (response?.status == 201) {
      handleReturnButton()
    }
  };

  const submitEdit = async (data: Pet) => {
    const response = await updatePet(data)
    console.log('response :>> ', response);
    if (response?.status === 200) {
      handleReturnButton()
    }
  };

  console.log('pet :>> ', pet);

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
          <Typography variant="h5">{!!isCreate ? "Adicione um pet" : "Edite seu pet" }</Typography>
          <Avatar src={pet?.animalType == 'Cat' ? Cat : pet?.animalType == 'Dog'? Dog : Paw} 
            sx={{height: '150px', width: '150px', paddingBottom: '16px'}}/>
            <Stack spacing={3} direction="column" flexWrap="wrap" sx={{ 
              justifyContent: 'center',                
              marginBottom: '20px',
              }}
            >
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input 
                {...register("name")}
                onChange={(e) => setPet({...pet, name: e.target.value})}
                value={pet.name}
              />              
            </FormControl>
            <FormControl>
            <FormLabel>Tipo</FormLabel>
              <Select 
                placeholder="Escolha o tipo do seu pet"
                value={pet.animalType}  
                onChange={(_, newValue) => setPet({...pet, animalType: newValue })}
                sx={{width: '250px'}}
              >
                <Option value="Cat">Gato</Option>
                <Option value="Dog">Cachorro</Option>
              </Select>           
            </FormControl>
            <FormControl>
              <FormLabel>Aniversário</FormLabel>
              <Input
                type="date"
                value={pet.birthDate?.split('T')[0]}  

                slotProps={{
                  input: {
                    min: '2018-06-07T00:00',
                    max: '2018-06-14T00:00',
                  },
                }}
                onChange={(e) => setPet({...pet, birthDate: e.target.value})}

              />           
            </FormControl>
            <FormControl>
              <FormLabel>Peso</FormLabel>
              <Input 
                {...register("weight")}
                endDecorator={"KG"}
                value={pet.weight}  

                onChange={(e) => setPet({...pet, weight: e.target.value})}
              />          
            </FormControl>
            <FormControl>
              <FormLabel>Raça</FormLabel>
              <Input 
                {...register("breed")}
                value={pet.breed}  

                onChange={(e) => setPet({...pet, breed: e.target.value})}
              />      
            </FormControl>
            <FormControl>
              <FormLabel>Gênero</FormLabel>
              <Input 
                {...register("gender")}
                value={pet.gender}  

                onChange={(e) => setPet({...pet, gender: e.target.value})}
              />          
            </FormControl>
          
          </Stack>
          <Stack>
            <Button
              color="neutral"
              variant="soft"

                onClick={() => {isCreate ? submitCreate(pet) : submitEdit(pet)}}
                sx={{  width: '80px' }}
              >
                Salvar
              </Button>
          </Stack>  
        </Container>

       
      </Container>
  </>
  )
};
