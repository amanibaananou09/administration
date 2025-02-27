import api from "./axios";
import { PTSDateTime } from "../AdminModel";

const API_URL = "/customerAccount";

const STATION_API = "/station";

export const dateTime = async (
  customerAccountId: string | undefined,
  stationId: string | undefined,
): Promise<PTSDateTime> => {
  const response = await api.post(
    `${API_URL}/${customerAccountId}${STATION_API}/${stationId}/date`,
  );

  return response.data;
};
