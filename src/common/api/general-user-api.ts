import { CustomerAccount, GeneralUser, userScope } from "common/AdminModel";
import api from "./axios";

const API_URL = "/user";

type userSearchCreteria = {
  name?: string;
  creator?: string;
  parent?: string;
};

export const getUsers = async (
  creteria: userSearchCreteria = {},
  page: number,
  size: number,
): Promise<{
  content: GeneralUser[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  size: number;
}> => {
  let url = `${API_URL}/filter`;

  const { name, creator, parent } = creteria;

  const searchParams = new URLSearchParams();

  if (name || parent || creator) {
    url;
  } else {
    url;
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

  searchParams.append("page", page.toString());
  searchParams.append("size", size.toString());

  const response = await api.get(url + "?" + searchParams.toString());

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

export const getUserByUsername = async (username: string) => {
  const response = await api.get(`${API_URL}/username/${username}`);

  return response.data;
};

export const getUserByEmail = async (email: string) => {
  const response = await api.get(`${API_URL}/email/${email}`);

  return response.data;
};

export const updateUser = async (user: GeneralUser) => {
  const response = await api.put(`${API_URL}/update`, user);
  return response.data;
};
