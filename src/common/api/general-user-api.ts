import { GeneralUser } from "common/model";
import api from "./axios";

const API_URL = "/user";

export const getUsers = async (): Promise<GeneralUser[]> => {
  const response = await api.get(API_URL);
  return response.data;
};

export const createGeneralUser = async (user: GeneralUser): Promise<void> => {
  await api.post(`${API_URL}/add`, user);
};
