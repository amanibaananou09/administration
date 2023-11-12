import api from "./axios";

const API_URL = "/customerAccount";

export const getListOfCustomerAccount = async () => {
  const response = await api.get(`${API_URL}?actif`);

  return response.data;
};
