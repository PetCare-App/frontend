import { api } from "./api"

export const createPetService = async (petData: any) => {
  return await api.post(
    "/pets/",
    { ...petData },
  )
}

export const updatePetService = async (petData: any) => {
  return await api.patch(
      `/pets/${petData.id}`,
      { ...petData },
    )
  }

  export const deletePetService = async (id: any) => {
    return await api.delete(
        `/pets/${id}`
      )
    }

export const getPetsService = async (userId: number) => {
  return await api.get(
  `/users/${userId}`
  )
}

export const getPetPdfService = async (petId: number) => {
    return await api.get(
    `/pets/${petId}/pdf`,{ 
    headers: {
      'Content-Type': 'application/pdf'
    },       
    responseType: 'blob' //faltava setar o tipo da response pra ser blob :)
   })
}