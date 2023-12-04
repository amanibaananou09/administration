import { Station } from "common/model";
import api from "./axios";

const API_URL = "/configuration";

export const getAllTank = async (station: Station) => {
  const response = await api.get(`${API_URL}/tank/${station.controllerPts.id}`);

  return response.data;
};

export const getAllFuelGrades = async (station: Station) => {
  const response = await api.get(
    `${API_URL}/fuelGrade/${station.controllerPts.id}`,
  );

  return response.data;
};

export const getAllPump = async (station: Station) => {
  const response = await api.get(`${API_URL}/pump/${station.controllerPts.id}`);

  return response.data;
};

export const getAllNozzle = async (station: Station) => {
  const response = await api.get(
    `${API_URL}/nozzle/${station.controllerPts.id}`,
  );

  return response.data;
};

export const getControllerVersion = async () => {
  const response = await api.get(`${API_URL}/version`);

  return response.data;
};

export const getAllPumpByNozzel = async (
  station: Station,
  selectedPump: string,
) => {
  const response = await api.get(
    `${API_URL}/nozzleByPump/${station.controllerPts.id}/${selectedPump}`,
  );

  return response.data;
};

export const getallTransactionPump = async (
  currentPage: number,
  station: Station,
  pumpId: string,
  fuelGrade: string,
  volume: string,
  startDate: string,
  endDate: string,
) => {
  const response = await api.get(
    `${API_URL}/transaction/${station.controllerPts.id}?pumpId=${pumpId}&fuelGrade=${fuelGrade}&volume=${volume}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}`,
  );

  return response.data;
};

export const getAllTankDelivery = async (
  currentPage: number,
  station: Station,
  filterType: string,
  tank: string,
  startDate: string,
  endDate: string,
) => {
  const response = await api.get(
    `${API_URL}/delivery/${station.controllerPts.id}?filterType=${filterType}&tank=${tank}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}`,
  );

  return response.data;
};

export const getAllProb = async (station: Station) => {
  const response = await api.get(
    `${API_URL}/probe/${station.controllerPts.id}`,
  );

  return response.data;
};

export const getAllReader = async (station: Station) => {
  const response = await api.get(
    `${API_URL}/reader/${station.controllerPts.id}`,
  );

  return response.data;
};
