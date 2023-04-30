import { api } from "./api";

export const login = async (data: any) => {
  const { email, password } = data;

  return await api.post(
    "/login",
    { email, password },
  );
};