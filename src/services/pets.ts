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

export const getPetsService = async (userId: number) => {
  return await api.get(
  `/users/${userId}`
  )

}