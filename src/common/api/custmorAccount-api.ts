import api from "./axios";

const API_URL = "/customerAccount";

export const getListOfCustomerAccount = async (
  token: string

) => {
  const response = await api.get(`${API_URL}?actif`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

  return response.data;
};