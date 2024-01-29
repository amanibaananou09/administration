import { Country } from "common/model";
import api from "./axios";

const API_URL = "/referenceData";

export const getListOfCountry = async (): Promise<Country[]> => {
  const response = await api.get(`${API_URL}/countries`);

  return response.data;
};
