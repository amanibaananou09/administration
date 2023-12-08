import { AddStation, CustomerAccount, MasterUser } from "common/AdminModel";
import api from "./axios";

const API_URL = "/customerAccount";

export const getListOfCustomerAccount = async () => {
  const response = await api.get(`${API_URL}`);

  return response.data;
};

export const createCustomerAccount = async (
  account: CustomerAccount,
): Promise<CustomerAccount> => {
  try {
    const response = await api.post(`${API_URL}/add`, account);
    console.log("API Response:", response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error("Error in createCustomerAccount:", error);
    throw error;
  }
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
