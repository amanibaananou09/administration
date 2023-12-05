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
  period?: string,
  startDate?: string,
  endDate?: string,
) => {
  let url = `${API_URL}/sales/fuelName/${station.controllerPts.id}?`;

  url = addFilterParams(url, period, startDate, endDate);

  const response = await api.get(url);

  return response.data;
};

export const getAllSalesByPump = async (
  station: Station,
  period?: string,
  startDate?: string,
  endDate?: string,
) => {
  let url = `${API_URL}/sales/${station.controllerPts.id}?`;

  url = addFilterParams(url, period, startDate, endDate);

  const response = await api.get(url);

  return response.data;
};

export const getAllSalesByPumpAndGrades = async (
  pumpId: number,
  station: Station,
  period?: string,
  startDate?: string,
  endDate?: string,
) => {
  let url = `${API_URL}/salesByGrades/${station.controllerPts.id}/${pumpId}?`;

  url = addFilterParams(url, period, startDate, endDate);

  const response = await api.get(url);

  return response.data;
};

export const addFilterParams = (
  url: string,
  period?: string,
  startDate?: string,
  endDate?: string,
) => {
  let newUrl = url;

  if (period) {
    newUrl += `typePeriod=${period}`;
  }

  if (startDate) {
    newUrl += `&startDate=${startDate}`;
  }

  if (endDate) {
    newUrl += `&endDate=${endDate}`;
  }

  return newUrl;
};
