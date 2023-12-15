import { GeneralUser, userScope } from "common/AdminModel";
import api from "./axios";

const API_URL = "/user";

export const listUser = async (): Promise<GeneralUser[]> => {
  const response = await api.get(API_URL);
  return response.data;
};

export const addUser = async (user: GeneralUser): Promise<void> => {
  await api.post(`${API_URL}/add`, user);
};

export const userInformation = async (
  id: number | string,
): Promise<GeneralUser> => {
  const response = await api.get(`${API_URL}/${id}/info`);
  return response.data;
};

export const functionScope = async (
  id: number | string,
  functionScopes: string | undefined,
): Promise<userScope | null> => {
  const response = await api.get(
    `${API_URL}/${id}/functions?functionalScope=${functionScopes}`,
  );
  return response.data;
};
export const activateUser = async (id: number) => {
  const response = await api.post(`${API_URL}/activate/${id}`);

  return response.data;
};

export const deactivateUser = async (id: number) => {
  const response = await api.post(`${API_URL}/deactivate/${id}`);
  return response.data;
};
export const findUserByFilter = async (type: string, text: string | null) => {
  const url = `${API_URL}/filter?${type}=${text}`;

  const response = await api.get(url);
  return response.data;
};
