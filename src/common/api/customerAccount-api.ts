import { addStations, CustomerAccount, MasterUser } from "common/AdminModel";
import api from "./axios";

const API_URL = "/customerAccount";

type customerAccountSearchCreteria = {
  name?: string;
  creator?: string;
  parent?: string;
};

export const getCustomerAccounts = async (
  creteria: customerAccountSearchCreteria = {},
) => {
  let url = `${API_URL}`;

  const { name, creator, parent } = creteria;

  const searchParams = new URLSearchParams();

  if (name || parent || creator) {
    url += "/filter?";
  }

  if (name) {
    searchParams.append("name", name);
  }

  if (creator) {
    searchParams.append("creator", creator);
  }

  if (parent) {
    searchParams.append("parent", parent);
  }

  const response = await api.get(url + searchParams.toString());

  return response.data;
};

export const getCustomerAccountDetails = async (customerAccountId: number) => {
  const response = await api.get<CustomerAccount>(
    `${API_URL}/${customerAccountId}/info`,
  );

  return response.data;
};

export const activateCustomerAccount = async (id: number | string) => {
  const response = await api.put(`${API_URL}/activate/${id}`);

  return response.data;
};

export const deactivateCustomerAccount = async (id: number | string) => {
  const response = await api.put(`${API_URL}/deactivate/${id}`);
  return response.data;
};

export const updateAccount = async (account: CustomerAccount) => {
  const response = await api.put(`${API_URL}/update`, account);
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
  customerAccountId: string | undefined,
  station: addStations,
): Promise<void> => {
  await api.post(`${API_URL}/${customerAccountId}/station/add`, station);
};
