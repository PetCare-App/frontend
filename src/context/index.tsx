import React, { createContext, useContext, useState } from 'react';
import { Pet } from '../types/pets';
import { createPetService, deletePetService, getPetsService, updatePetService } from '../services/pets';
import { User } from '../types/users';
import { getUserService, updateUserService } from '../services/users';

export const PetCareContext = createContext({} as any);


export function ProviderContext({ children }: any) { 

  const [pets, setPets] = useState<any[]>([])
  const [user, setUser] = useState<User>({email: '', id: 1, fullname: ''})

  const getPets = async () => {
    try {
      const response = await getPetsService(user.id);
      setPets(response.data.pets)

    } catch (error) {
      throw error
    }
    
  }

  const createPet = async (petData: any) => {
    try {

      petData.userId = user.id;
      petData.weight = parseFloat(petData.weight)
      const response = await createPetService(petData);
      return response
    } catch (error) {
      throw error
    }
  }

  
  const updatePet = async (petData: any) => {
    try {
      petData.weight = parseFloat(petData.weight)
      const response = await updatePetService(petData);
      return response
    } catch (error) {
      throw error
    }
  }

  const deletePet = async (id: any) => {
    try {
      const response = await deletePetService(id);
      return response
    } catch (error) {
      throw error
    }
  }

  const getUser = async () => {
    try {
      const response = await getUserService(user.id);
      setUser({...response.data})

    } catch (error) {
      throw error
    }
  }

  const updateUser = async (userData: any) => {
    try {
      delete userData.password
      delete userData.pets
      const response = await updateUserService(userData);
      return response
    } catch (error) {
      throw error
    }
  }

  
const states = {
  pets,
  user,
  
 
};

const actions = {
  getPets,
  createPet, 
  setUser,
  updatePet,
  deletePet,
  getUser,
  updateUser,
};


return (
    <PetCareContext.Provider value={{ ...states, ...actions }}>
      {children}
    </PetCareContext.Provider>
  ); 
}


export const usePetCareContext = () => useContext(PetCareContext);

