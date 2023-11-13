import { GeneralUser } from "common/AdminModel";
import api from "./axios";

const API_URL = "/user";

export const listUser = async (): Promise<GeneralUser[]> => {
  const response = await api.get(API_URL);
  return response.data;
};

export const addUser = async (user: GeneralUser): Promise<void> => {
  await api.post(`${API_URL}/add`, user);
};
