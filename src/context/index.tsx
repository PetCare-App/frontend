import React, { createContext, useContext, useState } from 'react';
import { Pet } from '../types/pets';
import { createPetService, getPetsService, updatePetService } from '../services/pets';
import { User } from '../types/users';

export const PetCareContext = createContext({} as any);

export function ProviderContext({ children }: any) { 

  const [pets, setPets] = useState<any[]>([])
  const [user, setUser] = useState<User>({email: 'nadine.zingano@gmail.com', id: 1})

  const getPets = async () => {
    try {
      const response = await getPetsService(user.id);
      setPets(response.data.pets)

    } catch (error) {
      console.log('error :>> ', error);
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

  
const states = {
  pets,
  user,
  
 
};

const actions = {
  getPets,
  createPet, 
  setUser,
  updatePet
};


return (
    <PetCareContext.Provider value={{ ...states, ...actions }}>
      {children}
    </PetCareContext.Provider>
  ); 
}


export const usePetCareContext = () => useContext(PetCareContext);

