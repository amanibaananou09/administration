import { Station } from "common/model";
import api from "./axios";

const API_URL = "/stat";

export const getStatTankMeasurment = async (station: Station) => {
  const response = await api.get(`${API_URL}/tank/${station.controllerPts.id}`);

  return response.data;
};

export const getLastTankDelivery = async (station: Station, tank: number) => {
  const response = await api.get(
    `${API_URL}/lastDelivery/${station.controllerPts.id}/${tank}`,
  );

  return response.data;
};

export const getAllSalesByGrades = async (
  station: Station,
  periode: string,
  startDate: string,
  endDate: string,
) => {
  const response = await api.get(
    `${API_URL}/sales/fuelName/${station.controllerPts.id}?typePeriod=${periode}&startDate=${startDate}&endDate=${endDate}`,
  );

  return response.data;
};

export const getAllSalesByPump = async (
  station: Station,
  periode: string,
  startDate: string,
  endDate: string,
) => {
  const response = await api.get(
    `${API_URL}/sales/${station.controllerPts.id}?typePeriod=${periode}&startDate=${startDate}&endDate=${endDate}`,
  );

  return response.data;
};

export const getAllSalesByPumpAndGrades = async (
  pumpId: number,
  station: Station,
  periode: string,
  startDate: string,
  endDate: string
) => {
  const response = await api.get(
    `${API_URL}/salesByGrades/${station.controllerPts.id}/${pumpId}?typePeriod=${periode}&startDate=${startDate}&endDate=${endDate}`,
  );

  return response.data;
};
