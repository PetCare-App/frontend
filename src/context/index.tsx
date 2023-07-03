import React, { createContext, useContext, useState } from "react";
import { Pet } from "../types/pets";
import {
  createPetService,
  deletePetService,
  getPetPdfService,
  getPetsService,
  updatePetService,
} from "../services/pets";
import { User } from "../types/users";
import { getUserService, updateUserService } from "../services/users";
import {
  createHigieneService,
  deleteHigieneService,
  getHigienesService,
  updateHigieneService,
} from "../services/higienes";
import { Higiene } from "../types/higiene";
import { ControleParasitario } from "../types/controleParasitario";
import {
  createControleParasitarioService,
  deleteControleParasitarioService,
  getControleParasitariosService,
  updateControleParasitarioService,
} from "../services/controleParasitarios";

export const PetCareContext = createContext({} as any);

export function ProviderContext({ children }: any) {
  const [pets, setPets] = useState<any[]>([]);
  const [user, setUser] = useState<User>({ email: "", id: 5, fullname: "" });
  const [higienes, setHigienes] = useState<Higiene[]>([]);
  const [controleParasitarios, setControleParasitarios] = useState<
    ControleParasitario[]
  >([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(false);

  const getPets = async () => {
    try {
      const response = await getPetsService(user.id);
      setPets(response.data.pets);
    } catch (error) {
      throw error;
    }
  };

  const createPet = async (petData: any) => {
    try {
      petData.userId = user.id;
      petData.weight = parseFloat(petData.weight);
      setSuccessMessage(true);
      const response = await createPetService(petData);
      return response;
    } catch (error) {
      setErrorMessage(true);
      throw error;
    }
  };

  const updatePet = async (petData: any) => {
    try {
      petData.weight = parseFloat(petData.weight);
      const response = await updatePetService(petData);
      setSuccessMessage(true);
      return response;
    } catch (error) {
      setErrorMessage(true);
      throw error;
    }
  };

  const deletePet = async (id: any) => {
    try {
      const response = await deletePetService(id);
      setDeleteSuccessMessage(true);
      return response;
    } catch (error) {
      setDeleteErrorMessage(true);
      throw error;
    }
  };

  const getUser = async () => {
    try {
      const response = await getUserService(user.id);
      setUser({ ...response.data });
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (userData: any) => {
    try {
      delete userData.password;
      delete userData.pets;
      const response = await updateUserService(userData);
      setSuccessMessage(true);
      return response;
    } catch (error) {
      setErrorMessage(true);
      throw error;
    }
  };

  const getHigienes = async () => {
    try {
      const petList = pets.map((pet) => pet.id);
      let listaHigiene = [];
      for await (let id of petList) {
        const response = await getHigienesService(id);
        listaHigiene.push(...response.data.hygiene);
      }
      setHigienes(listaHigiene);
    } catch (error) {
      throw error;
    }
  };

  const createHigiene = async (higieneData: any) => {
    try {
      const data = {
        ...higieneData,
        petId: parseInt(higieneData.petId, 10),
      };
      const response = await createHigieneService(data);
      setSuccessMessage(true);
      return response;
    } catch (error) {
      setErrorMessage(true);
      throw error;
    }
  };

  const updateHigiene = async (higieneData: any) => {
    try {
      const response = await updateHigieneService(higieneData);
      setSuccessMessage(true);
      return response;
    } catch (error) {
      setErrorMessage(true);
      throw error;
    }
  };

  const deleteHigiene = async (id: any) => {
    try {
      const response = await deleteHigieneService(id);
      setDeleteSuccessMessage(true);
      return response;
    } catch (error) {
      setDeleteErrorMessage(true);
      throw error;
    }
  };

  const getControleParasitarios = async () => {
    try {const petList = pets.map((pet) => pet.id);
      let listaControleParasitario = [];
      for await (let id of petList) {
        const response = await getControleParasitariosService(id);
        listaControleParasitario.push(...response.data.parasiteControl);
      }
      setControleParasitarios(listaControleParasitario);
    } catch (error) {
      throw error;
    }
  };

  const createControleParasitario = async (controleParasitarioData: any) => {
    try {
      const data = {
        ...controleParasitarioData,
        petId: parseInt(controleParasitarioData.petId, 10),
      };
      const response = await createControleParasitarioService(data);
      setSuccessMessage(true);
      return response;
    } catch (error) {
      setErrorMessage(true);
      throw error;
    }
  };

  const updateControleParasitario = async (controleParasitarioData: any) => {
    try {
      const response = await updateControleParasitarioService(
        controleParasitarioData
      );
      setSuccessMessage(true);
      return response;
    } catch (error) {
      setErrorMessage(true);
      throw error;
    }
  };

  const deleteControleParasitario = async (id: any) => {
    try {
      const response = await deleteControleParasitarioService(id);
      setDeleteSuccessMessage(true);
      return response;
    } catch (error) {
      setDeleteErrorMessage(true);
      throw error;
    }
  };

  const getPetPdf = async (id: any) => {
    try {
      const response = await getPetPdfService(id);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'arquivo.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao baixar o PDF:', error);
    }
};

  const states = {
    pets,
    user,
    higienes,
    controleParasitarios,
    successMessage,
    errorMessage,
    deleteErrorMessage,
    deleteSuccessMessage
  };

  const actions = {
    getPets,
    createPet,
    setUser,
    updatePet,
    deletePet,
    getUser,
    updateUser,
    getHigienes,
    createHigiene,
    setHigienes,
    updateHigiene,
    deleteHigiene,
    getControleParasitarios,
    createControleParasitario,
    updateControleParasitario,
    deleteControleParasitario,
    setSuccessMessage,
    setErrorMessage,
    setDeleteErrorMessage,
    setDeleteSuccessMessage,
    getPetPdf
  };

  return (
    <PetCareContext.Provider value={{ ...states, ...actions }}>
      {children}
    </PetCareContext.Provider>
  );
}

export const usePetCareContext = () => useContext(PetCareContext);
