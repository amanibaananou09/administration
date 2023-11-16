import { CustAccount,MasterUser ,AddStation} from "common/AdminModel";
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

export const addUser = async (user: MasterUser, id: number | string): Promise<void> => {
  const response = await api.post(`${API_URL}/${id}/user/add`, user);
  return response.data;
};

export const addStation = async (station: AddStation, id: number | string): Promise<void> => {
  await api.post(`${API_URL}/${id}/station/add`, station);
};

