import { Station, User } from "common/model";
import api from "./axios";

const API_URL = "/station";

export const getAllControllers = async () => {
  const response = await api.get(`${API_URL}/allContoller`);

  return response.data;
};

export const addController = async (station: any, ptsId: any) => {
  const response = await api.post(`${API_URL}/addController/${station}`, {
    ptsId,
  });

  return response.data;
};

export const createStation = async (station: Station, user: User) => {
  const { name, address, controllerPts, country } = station;

  const response = await api.post(`${API_URL}/add`, {
    name,
    address,
    controllerPts,
    country,
    userLogin: user.username,
  });

  return response.data;
};

export const updateStation = async (station: Station, user: User) => {
  const { name, address, controllerPts, country } = station;

  const response = await api.post(`${API_URL}/update/${station.id}`, {
    name,
    address,
    controllerPts,
    country,
    userLogin: user.username,
  });

  return response.data;
};

export const deleteStation = async (station: Station) => {
  const response = await api.delete(`${API_URL}/delete/${station.id}`);

  return response.data;
};

export const findControllerByStation = async (station: Station) => {
  const response = await api.get(`${API_URL}/findController/${station.name}`);

  return response.data;
};
