import { CustAccount } from "common/AdminModel";
import api from "./axios";

const API_URL = "/customerAccount";

export const getListOfCustomerAccount = async () => {
  const response = await api.get(`${API_URL}?actif`);

  return response.data;
};

export const createCustomerAccount = async (account: CustAccount ) : Promise<CustAccount> => {
  const response = await api.post(`${API_URL}/add`, account);

  return response.data;
};
