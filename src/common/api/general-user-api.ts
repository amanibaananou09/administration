import { GeneralUser, userScope } from "common/AdminModel";
import api from "./axios";

const API_URL = "/user";

type userSearchCreteria = {
  name?: string;
  creator?: string;
  parent?: string;
};

export const getUsers = async (
  creteria: userSearchCreteria = {},
): Promise<GeneralUser[]> => {
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