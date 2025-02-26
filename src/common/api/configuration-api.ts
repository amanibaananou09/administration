import api from "./axios";

const API_URL = "/configuration";

export const getFirmwareVersion = async (ptsId: string): Promise<string> => {
  const response = await api.get(`${API_URL}/version`, { params: { ptsId } });
  return response.data;
};
