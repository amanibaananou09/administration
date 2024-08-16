import { User } from "common/model";
import api from "./axios";
import { CustomerAccount } from "../AdminModel";
const API_URL = "/user";
export const login = async (username: string, password: string) => {
  const response = await api.post("/login", {
    username,
    password,
    admin: true,
  });

  return response.data;
};

export const createUser = async (user: User) => {
  const { lastName, firstName, username, email, role } = user;
  const response = await api.post("/createUser", {
    lastName: lastName,
    firstName: firstName,
    username,
    email,
    role,
  });

  return response.data;
};
export const searchUser = async (): Promise<CustomerAccount[]> => {
  const response = await api.get(`${API_URL}/search?`);
  return response.data;
};
export const impersonateUser = async (targetUserId: number) => {
  const response = await api.post(`/impersonate/${targetUserId}`);
  return response.data;
};
export const exitImpersonation = async (targetUserId: number) => {
  const response = await api.post(`/impersonate/${targetUserId}/exit`);
  return response.data;
};
