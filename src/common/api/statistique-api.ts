import { Station } from "common/model";
import { addFilterParams } from "./api-utils";
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
  startDate?: string,
  endDate?: string,
) => {
  let url = `${API_URL}/sales/fuelName/${station.controllerPts.id}?`;

  url = addFilterParams(url, startDate, endDate);

  const response = await api.get(url);

  return response.data;
};

export const getAllSalesByPump = async (
  station: Station,
  startDate?: string,
  endDate?: string,
) => {
  let url = `${API_URL}/sales/${station.controllerPts.id}?`;

  url = addFilterParams(url, startDate, endDate);

  const response = await api.get(url);

  return response.data;
};

export const getAllSalesByPumpAndGrades = async (
  pumpId: number,
  station: Station,
  startDate?: string,
  endDate?: string,
) => {
  let url = `${API_URL}/salesByGrades/${station.controllerPts.id}/${pumpId}?`;

  url = addFilterParams(url, startDate, endDate);

  const response = await api.get(url);

  return response.data;
};