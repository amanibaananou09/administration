import { User } from "common/model";
import api from "./axios";

export const login = async (username: string, password: string) => {
  const response = await api.post("/login", { username, password });

  return response.data;
};

export const createUser = async (user: User) => {
  const { family_name, given_name, username, email, role } = user;
  const response = await api.post("/createUser", {
    family_name,
    given_name,
    username,
    email,
    role,
  });

  return response.data;
};

export const getListUser = async () => {
  const response = await api.get("/listUsers");

  return response.data;
};
