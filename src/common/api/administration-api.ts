import { User } from "common/model";
import api from "./axios";

const API_URL = "/customerAccount";

export const getStationForUser = async (username: string, token: string) => {
  const response = await api.get(`${API_URL}/station/${username}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response.data;
};

export const getStations = async (user: User) => {
  return await getStationForUser(user.username, user.token);
};
