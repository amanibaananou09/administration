import { Station, User } from "common/model";
import api from "./axios";

const API_URL = "/customerAccount";

export const getStationForUser = async (username: string, user: User) => {
  const response = await api.get(
    `${API_URL}/${user.customerAccountId}/station?userLogin=${username}`,
    {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    },
  );

  return response.data;
};

export const getStations = async (user: User) => {
  return await getStationForUser(user.username, user);
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

export const allStationByCustomerAccount = async (id: string) => {
  const response = await api.get(`${API_URL}/${id}/station`);

  return response.data;
};
export const allUserByCustomerAccount = async (id: string) => {
  const response = await api.get(`${API_URL}/${id}/user`);

  return response.data;
};
export const getCustomerAccountInformation = async (id: string) => {
  const response = await api.get(`${API_URL}/${id}/info`);

  return response.data;
};

