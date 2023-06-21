import React, { createContext, useContext, useState } from 'react';
import { Pet } from '../types/pets';
import { createPetService, deletePetService, getPetsService, updatePetService } from '../services/pets';
import { User } from '../types/users';
import { Vaccine } from '../types/vaccines';
import { createVaccineService, getVaccinesByPetId } from '../services/vaccinesService';

export const PetCareContext = createContext({} as any);

export function ProviderContext({ children }: any) { 

  const [pets, setPets] = useState<any[]>([])
  const [user, setUser] = useState<User>({email: 'nadine.zingano@gmail.com', id: 3})
  const [vaccines, setVaccines] = useState<Vaccine[]>([])


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

  const getVaccines = async () => {
    try {
      let vaccineList: any[] = []
      for await (const pet of pets) {
        const response = await getVaccinesByPetId(pet.id);
          vaccineList.push(...response.data)
      }
      setVaccines(vaccineList)
    } catch (error) {
      throw error
    } 
  }

  const createVaccine = async (vaccineData: any) => {
    try {
      const response = await createVaccineService(vaccineData);
      return response
    } catch (error) {
      throw error
    }
  }

  
const states = {
  pets,
  user,
  vaccines
  
 
};

const actions = {
  getPets,
  createPet, 
  setUser,
  updatePet,
  deletePet,
  getVaccines,
  createVaccine
};


return (
    <PetCareContext.Provider value={{ ...states, ...actions }}>
      {children}
    </PetCareContext.Provider>
  ); 
}


export const usePetCareContext = () => useContext(PetCareContext);

