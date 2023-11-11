import { UserAcount } from "common/model";
import api from "./axios";

const API_URL = "/user";

export const getUsers = async (): Promise<UserAcount[]> => {
  const response = await api.get(`${API_URL}`);
  return response.data;
};
