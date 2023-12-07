import { ChartFilter, Station } from "common/model";
import { addFilterParams } from "./api-utils";

import api from "./axios";

const API_URL = "/data";

export const getChartByFuelPumpPeriod = async (
  station: Station,
  filter: ChartFilter,
  startDate?: string,
  endDate?: string,
) => {
  let url = `${API_URL}/sales/${station.controllerPts.id}?chartType=${filter.chartType}&fuel=${filter.fuelGrade}&pump=${filter.pump}&`;

  url = addFilterParams(url, startDate, endDate);

  const response = await api.get(url);

  return response.data;
};

export const getChartByFuelTankPeriod = async (
  controllerId: string,
  fuelGrade: string,
  tank: string,
  period: string,
) => {
  const response = await api.get(
    `${API_URL}/deliveries/${fuelGrade}/${tank}/${period}/${controllerId}`,
  );

  return response.data;
};

export const getAllStatVent = async (
  station: Station,
  startDate?: string,
  endDate?: string,
) => {
  let url = `${API_URL}/salesByUser/${station.controllerPts.id}?`;

  url = addFilterParams(url, startDate, endDate);

  const response = await api.get(url);

  return response.data;
};

export const getAllTankByIdc = async (station: Station) => {
  const response = await api.get(
    `${API_URL}/allTankByIdC/${station.controllerPts.id}`,
  );

  return response.data;
};

export const getTankMeasurementByPeriod = async (
  station: Station,
  tank: string | number,
  startDate?: string,
  endDate?: string,
) => {
  let url = `${API_URL}/tankMeasurementByPeriod/${station.controllerPts.id}?tank=${tank}&`;

  url = addFilterParams(url, startDate, endDate);

  const response = await api.get(url);

  return response.data;
};

export const getTankLevelByPeriod = async (
  station: Station,
  tank: string | number,
  startDate?: string,
  endDate?: string,
) => {
  let url = `${API_URL}/tankLevelByPeriod/${station.controllerPts.id}?tank=${tank}&`;

  url = addFilterParams(url, startDate, endDate);

  const response = await api.get(url);

  return response.data;
};
