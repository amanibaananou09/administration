import { AddStation, CustomerAccount, MasterUser } from "common/AdminModel";
import api from "./axios";

const API_URL = "/customerAccount";

export const getListOfCustomerAccount = async () => {
  const response = await api.get(`${API_URL}`);

  return response.data;
};
export const listOfCreator = async (id: string) => {
  const response = await api.get(`${API_URL}/${id}/creator`);

  return response.data;
};
export const activateCustomerAccount = async (id: number) => {
  const response = await api.put(`${API_URL}/activate/${id}`);

  return response.data;
};

export const deactivateCustomerAccount = async (id: number) => {
  const response = await api.put(`${API_URL}/deactivate/${id}`);
  return response.data;
};

export const createCustomerAccount = async (
  account: CustomerAccount,
): Promise<CustomerAccount> => {
  const response = await api.post(`${API_URL}/add`, account);
  return response.data;
};

export const addUser = async (
  user: MasterUser,
  id: number | string,
): Promise<void> => {
  const response = await api.post(`${API_URL}/${id}/user/add`, user);
  return response.data;
};

export const addStation = async (
  station: AddStation,
  id: number | string,
): Promise<void> => {
  await api.post(`${API_URL}/${id}/station/add`, station);
};

export const findByFilter = async (type: string, text: string | null) => {
  const url = `${API_URL}/filter?${type}=${text}`;

  const response = await api.get(url);
  return response.data;
};
